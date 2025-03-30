import React, { useState, useRef, useEffect } from 'react';
import styles from './style.module.css';
import Image from 'next/image';

import cx from 'classnames';

import micIcon from "public/icons/mic.svg";
import { updateUserDetails } from 'api';
import { loadState } from '@utils/localStorage';
import { PLAYER_STATUS, STORAGE_CONSTANTS } from '@utils/constants';
import { toast } from 'react-toastify';

const VoiceRecorder = (props: any) => {
    const { audioUrl, uploadAudio, editMode } = props;
    const [btnStatus, setBtnStatus] = useState<'inactive' | 'recording'>('inactive');
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const [countdown, setCountdown] = useState<number | null>(null);
    const [playerStatus, setPlayerStatus] = useState('');
    const [showEditBtn, setShowEditBtn] = useState(false);
    const timerRef = useRef(null);
    const [time, setTime] = useState(0);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const lastTimeRef = useRef(0);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const startTimeRef = useRef<number | null>(null);

    useEffect(() => {
        if (audioRef.current && audioUrl) {
            audioRef.current.src = audioUrl;
            setPlayerStatus(PLAYER_STATUS.PLAY);

            setShowEditBtn(true);

            play();
        }

    }, [audioUrl])

    useEffect(() => {
        if (navigator.mediaDevices === undefined) {
            (navigator as any).mediaDevices = {};
        }

        if (navigator.mediaDevices.getUserMedia === undefined) {
            navigator.mediaDevices.getUserMedia = function (constraints) {
                const getUserMedia = (navigator as any).webkitGetUserMedia || (navigator as any).mozGetUserMedia;
                if (!getUserMedia) {
                    return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
                }

                return new Promise((resolve, reject) => {
                    getUserMedia.call(navigator, constraints, resolve, reject);
                });
            };
        }

        console.log('navigator.mediaDevices', navigator.mediaDevices);
        window.ReactNativeWebView.postMessage(
            JSON.stringify({ action: JSON.stringify(navigator.mediaDevices) })
        );
        // return () => {
        //     audioRef.current = null;
        //     lastTimeRef.current = 0;
        //     setPlayerStatus('');
        //     setBtnStatus('inactive');
        //     setAudioBlob(null);
        // }
    }, []);

    const parseTime = (sec: number) => {
        const h = Math.floor(sec / 3600);
        const m = Math.floor((sec % 3600) / 60);
        sec = sec % 60;

        const hStr = h > 0 ? `${h}:` : '';
        const mStr = m < 10 ? `0${m}` : `${m}`;
        const sStr = sec < 10 ? `0${sec}` : `${sec}`;

        return `${hStr}${mStr}:${sStr}`;
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/mp4' });
            mediaRecorderRef.current = mediaRecorder;
            mediaRecorder.start();

            setBtnStatus('recording');

            if (navigator.vibrate) navigator.vibrate(150);
            startTimeRef.current = Math.ceil(Date.now() / 1000);

            mediaRecorder.ondataavailable = (event) => {
                chunksRef.current.push(event.data);
            };

            mediaRecorder.onstop = () => {
                stream.getTracks().forEach((track) => track.stop());

                const blob = new Blob(chunksRef.current, { type: 'audio/mp4' });

                setAudioBlob(blob);

                const audioUrl = URL.createObjectURL(blob);
                if (audioRef.current) {
                    audioRef.current.src = audioUrl;
                }

                chunksRef.current = [];
            };
        } catch (error) {
            // setMsg(location.protocol !== 'https:' ? `${lang.mic_error}<br>${lang.use_https}` : lang.mic_error);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        }
        setBtnStatus('inactive');

        if (navigator.vibrate) navigator.vibrate([200, 100, 200]);

        const now = Math.ceil(Date.now() / 1000);
        const t = parseTime(now - (startTimeRef.current || 0));

        setPlayerStatus(PLAYER_STATUS.PAUSE);
    };

    const play = () => {
        setPlayerStatus(PLAYER_STATUS.PLAY);

        if (audioRef.current) {
            startTimer();

            audioRef.current.currentTime = lastTimeRef.current;

            audioRef.current.addEventListener('ended', () => {
                setPlayerStatus(PLAYER_STATUS.PAUSE);
                resetTimer();

                (audioRef.current as any).currentTime = 0;
            });

            audioRef.current.play();
        }
    };

    const pause = () => {
        setPlayerStatus(PLAYER_STATUS.PAUSE);

        if (audioRef.current) {
            pauseTimer();

            lastTimeRef.current = audioRef.current.currentTime;

            audioRef.current.pause();

            audioRef.current.currentTime = 0;
        }
    };


    const handleButtonClick = () => {
        if (btnStatus === 'inactive') {
            startCountdown();
        } else if (btnStatus === 'recording') {
            stopRecording();
        }
    };

    const startCountdown = () => {
        setCountdown(3);
        const countdownInterval = setInterval(() => {
            setCountdown((prevCountdown) => {
                if (prevCountdown === 1) {
                    clearInterval(countdownInterval);
                    setCountdown(null);
                    startRecording();
                }
                return (prevCountdown || 0) - 1;
            });
        }, 1000);
    };

    const saveAudio = async () => {

        await uploadAudio(audioBlob);

        setShowEditBtn(true);
    };

    const editAudio = () => {
        pause();

        setPlayerStatus('');

        startCountdown();

        setShowEditBtn(false);

        resetTimer();
    }

    const startTimer = () => {
        if (!timerRef.current) {
            (timerRef as any).current = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        }
    };

    const pauseTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    const resetTimer = () => {
        pauseTimer();
        setTime(0);
    };

    const formatTime = (totalSeconds: number) => {
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className={styles.recorder_wrapper}>
            <div className={cx(styles.recorder, 'absolute-center mt-4 flex-col')}>
                <button
                    className={`${styles.record_btn} absolute-center ${btnStatus === 'recording' ? styles.recording : ''}`}
                    id="button"
                    onClick={handleButtonClick}
                >
                    {countdown !== null ? (
                        <span className={styles.countdown}>{countdown}</span>
                    ) : (
                        <Image src={micIcon} alt="mic icon" className={styles.micIcon} />
                    )}
                </button>

                {playerStatus !== '' && <span className='my-1'>{formatTime(time)}</span>}

                <div className='mt-4'>
                    {playerStatus === PLAYER_STATUS.PAUSE && <span onClick={play} className='border p-2 mr-2 rounded-lg'>Play</span>}
                    {playerStatus === PLAYER_STATUS.PLAY && <span onClick={pause} className='border p-2 mr-2 rounded-lg'>Pause</span>}
                    {(playerStatus === PLAYER_STATUS.PLAY || playerStatus === PLAYER_STATUS.PAUSE) && !showEditBtn && <span onClick={saveAudio} className='border p-2 rounded-lg'>Save</span>}
                    {(showEditBtn) && <span onClick={editAudio} className='border p-2 rounded-lg'>Edit</span>}

                    {playerStatus === '' && <span>Speak up bitch</span>}
                    <audio ref={audioRef}></audio>
                </div>

            </div>
        </div>
    );
};

export default VoiceRecorder;
