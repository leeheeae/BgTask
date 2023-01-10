/* eslint-disable no-async-promise-executor */
import React, { useEffect } from 'react';
import { View, Text, Platform, Linking, Pressable } from 'react-native';

import BackgroundService from 'react-native-background-actions';

const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

BackgroundService.on('expiration', () => {
    console.log('IOS: I am being closed');
});

const taskRandom = async (taskData) => {
    if (Platform.OS === 'ios') {
        console.warn(
            'This task will not keep your app alive in the background by itself',
            '으헤헤에에에에',
        );
    }

    console.log('실행됨');

    await new Promise(async () => {
        // for loop with a delay
        const { delay } = taskData;
        console.log(BackgroundService.isRunning(), delay);
        for (let i = 0; BackgroundService.isRunning(); i++) {
            console.log('런 => ', i);

            const data = await (await fetch('https://reactnative.dev/movies.json')).json();

            console.log('data', data, i);

            await BackgroundService.updateNotification({
                taskTitle: '변경됨요',
                taskDesc: '런 ->' + i,
                progressBar: 2,
            });

            await sleep(delay);
        }
    });
};

const options = {
    taskName: 'Example',
    taskTitle: 'ExampleTask title',
    taskDesc: 'ExampleTask description',
    taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
    parameters: {
        delay: 10000,
    },
};

function handleOpenURL(event) {
    console.log(event.url);
}

Linking.addEventListener('url', handleOpenURL);

const App = () => {
    // const usingHermes = typeof HermesInternal === 'object' && HermesInternal !== null;

    let playing = BackgroundService.isRunning();

    console.log('playing', playing);

    /**
     * Toggles the background task
     */

    const toggleBackground = async () => {
        playing = !playing;
        if (playing) {
            try {
                console.log('Trying to start background task');
                await BackgroundService.start(taskRandom, options); // 실행?
                console.log('Successful start!');
            } catch (error) {
                console.log('토글에러', error);
            }
        } else {
            console.log('멈춤');
            await BackgroundService.stop();
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>App</Text>
            <Pressable onPress={toggleBackground}>
                <Text>토글토글</Text>
            </Pressable>
        </View>
    );
};

export default App;
