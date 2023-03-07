import { useState } from 'react';

import Button from '../button/button';
import Start from './start';
import Question from './question';
import quizData from './data';

import StyledDiscoverTasteModal from './discovertastemodal.styled';

export interface QuizFormItemData {
    [x: string]: string | string[];
}

const DiscoverTasteModal = () => {
    const [progress, setProgress] = useState(0);
    const [prefs, setPrefs] = useState({
        plainorflavored: 'plain',
        favoriteflavors: [],
        caffeineornot: 'caffeine',
        typesoftea: [],
        favoriteregion: []
    });

    console.log(prefs);

    const handleChange = (data: QuizFormItemData) => setPrefs(prevState => ({ ...prevState, ...data }));

    return (
        <StyledDiscoverTasteModal
            className="DiscoverTasteModal"
            title="Discover Your Taste"
            footer={
                progress && progress <= Object.keys(quizData).length ? (
                    <>
                        <Button onClick={() => setProgress(current => current - 1)}>Back</Button>
                        <Button type="primary" onClick={() => setProgress(current => current + 1)}>
                            Next
                        </Button>
                    </>
                ) : null
            }
        >
            {!progress ? (
                <Start onProgress={setProgress} />
            ) : progress <= quizData.length ? (
                <Question
                    state={progress}
                    length={quizData.length + 1}
                    data={quizData[progress - 1]}
                    onChange={handleChange}
                />
            ) : (
                <>DONE</>
            )}
        </StyledDiscoverTasteModal>
    );
};

export default DiscoverTasteModal;
