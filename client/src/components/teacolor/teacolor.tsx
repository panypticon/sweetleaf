import { Link } from 'react-router-dom';

import StyledTeaColor from './teacolor.styled';

interface TeaColorDef {
    img: string;
    label: string;
    link: string;
}

const TeaColor = ({ data: { img, label, link } }: { data: TeaColorDef }): JSX.Element => (
    <StyledTeaColor className="TeaColor">
        <Link to={link}>
            <img src={img} alt={label} />
            <p>{label}</p>
        </Link>
    </StyledTeaColor>
);

export default TeaColor;
