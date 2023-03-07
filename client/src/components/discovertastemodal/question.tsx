import { Form, Checkbox, Radio } from 'antd';
import Steps from '../steps/steps';

import type { QuizFormItemData } from './discovertastemodal';

interface QuizItem {
    question: string;
    whyweask: string;
    answers: {
        type: string;
        name: string;
        data: { label: string; value: string }[];
    };
}

const Question = ({
    state,
    data: { question, whyweask, answers },
    onChange,
    length
}: {
    state: number;
    data: QuizItem;
    onChange: (data: QuizFormItemData) => void;
    length: number;
}) => {
    const [form] = Form.useForm();

    return (
        <div className="DiscoverTasteModal__Question">
            {<Steps progressDot items={new Array(length).fill({})} current={state - 1} />}
            <div>
                <h4>{question}</h4>
                <Form form={form} onValuesChange={onChange}>
                    {answers.type === 'one' && (
                        <Form.Item name={answers.name} initialValue={answers.data.at(0)?.value}>
                            <Radio.Group options={answers.data} />
                        </Form.Item>
                    )}
                    {answers.type === 'many' && (
                        <Form.Item name={answers.name} help="Leave unchecked if you have no preference">
                            <Checkbox.Group options={answers.data} />
                        </Form.Item>
                    )}
                </Form>
                <p>
                    <strong>Why we ask this:</strong> {whyweask}
                </p>
            </div>
        </div>
    );
};

export default Question;
