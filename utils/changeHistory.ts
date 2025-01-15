// import { setGeneralDetails } from 'Slices';
// import history from './history';
// const ChangeHistory = (action?: string, path?: string) => {
//     const dispatchGeneralDetails = (data: any) => {
//         setGeneralDetails({ ...data });
//     };

//     document.body.className = 'disabled';
//     switch (action) {
//         case 'push':
//             dispatchGeneralDetails({
//                 screenClass: 'fadeOutLeft',
//             });
//             setTimeout(() => {
//                 dispatchGeneralDetails({
//                     screenClass: '',
//                 });
//             }, 250);
//             break;

//         case 'back':
//             dispatchGeneralDetails({
//                 screenClass: 'fadeOutRight',
//             });
//             setTimeout(() => {
//                 dispatchGeneralDetails({
//                     screenClass: '',
//                 });
//             }, 250);
//             break;

//         default:
//             break;
//     }
//     setTimeout(() => {
//         document.body.className = '';
//         path ? history.push(path) : history.goBack();
//         if (action === 'back' && path) {
//             dispatchGeneralDetails({
//                 screenClass: 'fadeInLeft',
//             });
//         }
//     }, 250);
// };

// export default ChangeHistory;