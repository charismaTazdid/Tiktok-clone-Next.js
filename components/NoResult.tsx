import React from 'react';

interface IProps {
    text: string;
}
const NoResult = ({ text }: IProps) => {


    return (
        <div>
            No Video Found
        </div>
    );
};

export default NoResult;