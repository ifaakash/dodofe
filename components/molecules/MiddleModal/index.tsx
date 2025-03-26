import cx from 'classnames';
import styles from './middleModal.module.css';

const MiddleModal = ({ children, isOpened, setIsOpened, modalStyle }: { children: React.ReactNode, isOpened: boolean, setIsOpened: (isOpened: boolean) => void, modalStyle?: React.CSSProperties }) => {

    const handleClose = () => {
        setIsOpened(false);
    };

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    return (
        (isOpened) && (
            <div className={cx(styles.modalOverlay, 'z-50')} onClick={handleOverlayClick}>
                <div className={cx(styles.modalContent, 'pb-8 rounded-3xl')} style={{ ...modalStyle }}>

                    <button className={styles.closeButton} onClick={handleClose}>×</button>

                    {children}
                </div>
            </div>
        )
    );
};

export default MiddleModal;