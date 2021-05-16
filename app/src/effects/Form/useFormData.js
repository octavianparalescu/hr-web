import React, {useState} from 'react';

function useFormData(defaultObject) {
    const [formData, setFormData] = useState(defaultObject ?? {});

    const updateFormData = (e) => {
        const tempFormData = {...formData};
        tempFormData[e.target.name] = e.target.value;
        setFormData(tempFormData);
    };

    return {
        formData,
        updateFormData,
    };
}

export default useFormData;