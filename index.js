/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);

// let MyHeadlessTask = async (event) => {
//     // Get task id from event {}:
//     let taskId = event.taskId;
//     let isTimeout = event.timeout; // <-- true when your background-time has expired
//     if (isTimeout) {
//         /*
//         This task has exceeded its allowed running-time.
//         이 작업은 허용 된 실행 시간을 초과했습니다.
//         You must stop what you're doing immediately finish(taskId)
//         당신은 즉시 당신이하고있는 일을 멈춰야합니다 (taskid)
//         */
//         console.log('[BackgroundFetch] Headless TIMEOUT:', taskId);
//         BackgroundFetch.finish(taskId);
//         return;
//     }
//     console.log('[BackgroundFetch HeadlessTask] start: ', taskId);

//     /*
//     Perform an example HTTP request.
//     예제 HTTP 요청을 수행하십시오.
//     Important:  await asychronous tasks when using HeadlessJS.
//     중요 : HeadlessJS를 사용할 때 비스듬한 작업을 기다립니다.
//     */
//     let response = await fetch('https://reactnative.dev/movies.json');
//     let responseJson = await response.json();
//     console.log('[BackgroundFetch HeadlessTask] response: ', responseJson);

//     /*
//      Required:  Signal to native code that your task is complete.
//     필수 : 작업이 완료되었음을 기본 코드 신호.
//      If you don't do this, your app could be terminated and/or assigned
//     이 작업을 수행하지 않으면 앱이 종료 및/또는 할당 될 수 있습니다.
//     battery-blame for consuming too much time in background.
//     백그라운드에서 너무 많은 시간을 소비하기위한 배터리 비난.
//     */
//     BackgroundFetch.finish(taskId);
// };

// // Register your BackgroundFetch HeadlessTask
// // 배경을 등록합니다
// BackgroundFetch.registerHeadlessTask(MyHeadlessTask);
