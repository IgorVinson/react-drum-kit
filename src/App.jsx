import {useState, useEffect} from 'react';
import './App.css';

function App() {
    const [activeKey, setActiveKey] = useState(null);

    const sounds = [
        {key: 'A', keyCode: 65, sound: 'clap', src: './sounds/clap.wav'},
        {key: 'S', keyCode: 83, sound: 'hihat', src: './sounds/hihat.wav'},
        {key: 'D', keyCode: 68, sound: 'kick', src: './sounds/kick.wav'},
        {key: 'F', keyCode: 70, sound: 'openhat', src: './sounds/openhat.wav'},
        {key: 'G', keyCode: 71, sound: 'boom', src: './sounds/boom.wav'},
        {key: 'H', keyCode: 72, sound: 'ride', src: './sounds/ride.wav'},
        {key: 'J', keyCode: 74, sound: 'snare', src: './sounds/snare.wav'},
        {key: 'K', keyCode: 75, sound: 'tom', src: './sounds/tom.wav'},
        {key: 'L', keyCode: 76, sound: 'tink', src: './sounds/tink.wav'}
    ];

    const playSound = (keyCode) => {
        const sound = sounds.find(sound => sound.keyCode === keyCode);
        if (sound) {
            setActiveKey(keyCode);
            const audio = new Audio(sound.src);
            audio.currentTime = 0;
            audio.play();
        }
    };

    const handleKeyDown = (e) => {
        playSound(e.keyCode);
    };

    const handleKeyUp = () => {
        setActiveKey(null);
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return (
        <div className="keys">
            {sounds.map(({key, keyCode, sound}) => (
                <div
                    key={keyCode}
                    data-key={keyCode}
                    className={`key ${activeKey === keyCode ? 'playing' : ''}`}
                    onMouseDown={() => playSound(keyCode)}
                    onMouseUp={handleKeyUp}
                    onMouseLeave={handleKeyUp}
                    onTouchStart={() => playSound(keyCode)}
                    onTouchEnd={handleKeyUp}
                >
                    <kbd>{key}</kbd>
                    <span className="sound">{sound}</span>
                </div>
            ))}
        </div>
    );
}

export default App;
