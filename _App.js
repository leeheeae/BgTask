import { Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import BackgroundFetch from 'react-native-background-fetch';

export default function App() {
    const [events, setEvents] = useState([]);

    let count = 0;

    useEffect(() => {
        initBackgroundFetch();
    }, []);

    // init bg fetch
    const initBackgroundFetch = async () => {
        /* 
        BackgroundFetch event handler.
        BackgroundFetch 이벤트 핸들러
         */

        const onEvent = async (taskId) => {
            console.log('[BackgroundFetch] task: ', taskId);
            /*
             Do your background work...
            배경이 작동합니다 ...
            */
            await addEvent(taskId);

            console.log('실행됨');
            /* 
            IMPORTANT:  You must signal to the OS that your task is complete.
            중요 : 작업이 완료되었음을 OS에 신호를 보내야합니다.
            */
            BackgroundFetch.finish(taskId);
        };

        /*
            Timeout callback is executed when your Task has exceeded its allowed running-time.
            You must stop what you're doing immediately BackgroundFetch.finish(taskId)
            타임 아웃 콜백은 작업이 허용 된 실행 시간을 초과하면 실행됩니다.
            즉시하고있는 일을 중지해야합니다.
            */
        const onTimeout = async (taskId) => {
            console.warn('[BackgroundFetch] TIMEOUT task: ', taskId);
            BackgroundFetch.finish(taskId);
        };

        /*
            Initialize BackgroundFetch only once when component mounts.
            구성 요소가 마운트 할 때만 백그라운드를 한 번만 초기화합니다.
            */
        let status = await BackgroundFetch.configure(
            { minimumFetchInterval: 15 },
            onEvent,
            onTimeout,
        );

        console.log('[BackgroundFetch] configure status: ', status);
    };

    // Add a BackgroundFetch event to <FlatList>
    const addEvent = (taskId) => {
        /*
        Simulate a possibly long-running asynchronous task with a Promise.
        약속으로 장기적으로 실행되는 비동기식 작업을 시뮬레이션합니다.
        */
        return new Promise((resolve, reject) => {
            setEvents((prev) => [
                ...prev,
                {
                    taskId,
                    timestamp: new Date().toString(),
                },
            ]);

            setTimeout(() => (count += 1), 1000);

            resolve();
        });
    };

    console.log(events);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>App : {count}</Text>
        </View>
    );
}
