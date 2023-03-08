const quizData = [
    {
        question: 'Do you prefer food and drink plain or flavored?',
        whyweask:
            "There's Coke, and then there's Cherry Coke. There's frozen yogurt, and then there are fifteen toppings. Tea is the same – it can be consumed barebones or with additional flavors.",
        answers: {
            name: 'plainorflavored',
            type: 'one',
            data: [
                { label: 'Plain', value: 'plain' },
                { label: 'Flavored', value: 'flavored' }
            ]
        }
    },
    {
        question: 'What types of flavor do you like the most?',
        whyweask:
            'Tea comes in many forms, and even the one made from tea leaves has very distinct flavors depending on the way it was produced.',
        answers: {
            name: 'favoriteflavors',
            type: 'many',
            data: [
                { label: 'Citrus', value: 'citrus' },
                { label: 'Floral', value: 'floral' },
                { label: 'Herbal', value: 'herbal' },
                { label: 'Earthy', value: 'earthy' },
                { label: 'Vegetal', value: 'vegetal' }
            ]
        }
    },
    {
        question: 'Do you like the buzz of caffeine?',
        whyweask: "Most teas have it, some don't. Some people enjoy it, while some don't.",
        answers: {
            name: 'caffeineornot',
            type: 'one',
            data: [
                { label: 'Yes', value: 'caffeine' },
                { label: 'No', value: 'nocaffeine' }
            ]
        }
    },
    {
        question: 'What types of tea do you prefer?',
        whyweask: 'You might already have a certain taste (which we want to cater to).',
        answers: {
            name: 'typesoftea',
            type: 'many',
            data: [
                { label: 'Black', value: 'black' },
                { label: 'Green', value: 'green' },
                { label: 'White', value: 'white' },
                { label: 'Oolong', value: 'oolong' },
                { label: 'Herbal', value: 'herbal' }
            ]
        }
    },
    {
        question: 'Do you have a preferred region for teas?',
        whyweask: 'Every region has its own terroir, and characteristics based on the production process.',
        answers: {
            name: 'favoriteregion',
            type: 'many',
            data: [
                { label: 'China', value: 'china' },
                { label: 'Japan', value: 'japan' },
                { label: 'Korea', value: 'korea' },
                { label: 'Darjeeling', value: 'darjeeling' }
            ]
        }
    }
];

export default quizData;
