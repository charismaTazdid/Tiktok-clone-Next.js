import React from 'react';
import { footerList1, footerList2, footerList3 } from '../utils/constants';


const List = ({ listItem, mt }: { listItem: string[], mt: boolean }) => (

    <div className={`flex flex-wrap gap-2 ${mt && 'mt-5'}`}>
        {
            listItem.map((item) => (
                <p key={item} className="text-gray-400 text-sm hover:underline cursor-pointer" > {item} </p>
            ))
        }
    </div>
);


const Footer = () => {

    return (
        <div className='mt-6 hidden xl:block'>
            <List listItem={footerList1} mt={false} />
            <List listItem={footerList2} mt />
            <List listItem={footerList3} mt />
            <p className='text-gray-400 text-sm mt-5'> 	&#169; Raihan Tazdid</p>
        </div>
    );
};

export default Footer;