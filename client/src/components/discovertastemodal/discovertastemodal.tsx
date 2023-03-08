import { useState, useContext } from 'react';

import Button from '../button/button';
import Start from './start';
import Question from './question';
import Done from './done';
import quizData from './data';
import { modalContext } from '../../context/modalcontext';

import type { ModalContext } from '../../types';

import StyledDiscoverTasteModal from './discovertastemodal.styled';

export interface QuizFormItemData {
    [x: string]: string | string[];
}

const DiscoverTasteModal = () => {
    const [progress, setProgress] = useState(0);
    const [prefs, setPrefs] = useState<QuizFormItemData>({
        plainorflavored: 'plain',
        favoriteflavors: [],
        caffeineornot: 'caffeine',
        typesoftea: [],
        favoriteregion: []
    });

    const { setModal } = useContext(modalContext) as ModalContext;

    const handleChange = (data: QuizFormItemData) => setPrefs(prevState => ({ ...prevState, ...data }));

    const handleCancel = () =>
        progress && progress <= quizData.length
            ? window.confirm('Are you sure you want to cancel this quiz?') && setModal(null)
            : setModal(null);

    const currentAnswer = quizData[progress - 1]?.answers.name as string;

    return (
        <StyledDiscoverTasteModal
            className="DiscoverTasteModal"
            title="Discover Your Taste"
            footer={
                progress ? (
                    <>
                        <Button onClick={() => setProgress(current => current - 1)}>Back</Button>
                        {progress <= quizData.length && (
                            <Button type="primary" onClick={() => setProgress(current => current + 1)}>
                                Next
                            </Button>
                        )}
                    </>
                ) : null
            }
            onCancel={handleCancel}
        >
            {!progress ? (
                <Start onProgress={setProgress} />
            ) : progress <= quizData.length ? (
                <Question
                    state={progress}
                    length={quizData.length + 1}
                    data={quizData[progress - 1]}
                    answer={prefs[currentAnswer]}
                    onChange={handleChange}
                />
            ) : (
                <Done data={prefs} />
            )}
        </StyledDiscoverTasteModal>
    );
};

export default DiscoverTasteModal;
