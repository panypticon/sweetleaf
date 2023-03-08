import { useContext } from 'react';
import type { Dispatch, SetStateAction } from 'react';

import Button from '../button/button';
import { selectGlobalData } from '../../store/slices/globalData';
import { useAppSelector } from '../../store/hooks';
import { modalContext } from '../../context/modalcontext';
import LoginModal from '../loginmodal/loginmodal';
import SignupModal from '../signupmodal/signupmodal';

import type { ModalContext } from '../../types';

import leafletLeaves from '../../assets/leaflet-leaves.svg';

const Start = ({ onProgress }: { onProgress: Dispatch<SetStateAction<number>> }) => {
    const { user } = useAppSelector(selectGlobalData);

    const { setModal } = useContext(modalContext) as ModalContext;

    return (
        <div className="DiscoverTasteModal__Start">
            {user ? (
                <>
                    <img src={leafletLeaves} alt="Leaflet" />
                    <h4>New to Tea? Feeling Adventurous?</h4>
                    <div>
                        <p>Answer this short quiz to discover your preferences in the world of tea.</p>
                        <p>
                            <strong>
                                Once you finish Leaflet can make recommendations tailored to your individual taste.
                            </strong>
                        </p>
                    </div>
                    <Button type="primary" onClick={() => onProgress(1)}>
                        Start quiz
                    </Button>
                </>
            ) : (
                <>
                    <h4>You Need a Leaflet Account to Take the Quiz</h4>
                    <span className="accountbuttons">
                        <Button type="primary" onClick={() => setModal(<LoginModal />)}>
                            Log in
                        </Button>
                        <span>or</span>
                        <Button onClick={() => setModal(<SignupModal />)}>Sign up</Button>
                    </span>
                </>
            )}
        </div>
    );
};

export default Start;
