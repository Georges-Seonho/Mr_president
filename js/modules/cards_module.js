export const cards = [
    {
        content: `Make the military service mandatory from the age of 14?`,
        price: -3000,
        yes: 
            [
                {
                    impactedMinistry: 'Solidarity and Health', 
                    points: -3
                },
                {
                    impactedMinistry: 'Armed Forces', 
                    points: +3
                },
            ],
        no: 
            [
                {
                    impactedMinistry: 'Solidarity and Health', 
                    points: +3
                },
                {
                    impactedMinistry: 'Armed Forces', 
                    points: -3
                },
            ],
    },
    {
        content: `Reduce Army budget to finance a Home for All project`,
        price: 0,
        yes: 
            [
                {
                    impactedMinistry: 'Solidarity and Health', 
                    points: -3
                },
                {
                    impactedMinistry: 'Armed Forces', 
                    points: +3
                },
            ],
        no: 
            [
                {
                    impactedMinistry: 'Solidarity and Health', 
                    points: +3
                },
                {
                    impactedMinistry: 'Armed Forces', 
                    points: -3
                },
            ],
    },

];

