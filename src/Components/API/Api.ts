
export const filterDataByDate = async (dateTime:any) => {
    try {
        const response = await fetch('http://localhost:3004/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dateTime),
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error('Failed to fetch filtered data');
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};

export const getFiltersCustomerVersion = async () => {
    try {
        const response = await fetch(`http://localhost:3004/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
        
            return data;
        } else {
            console.error('Failed to fetch filtered customer version data');
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};
