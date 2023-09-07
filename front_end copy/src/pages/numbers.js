import React, { useState, useEffect } from 'react';

function NumberList() {
    const [numbersString, setNumbersString] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/numbers');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setNumbersString(data.numbers);
            } catch (error) {
                console.error('Error fetching numbers:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Numbers String</h2>
            <p>{numbersString}</p>
        </div>
    );
}

export default NumberList;
