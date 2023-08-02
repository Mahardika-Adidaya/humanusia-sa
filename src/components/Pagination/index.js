import React from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const Pagination = ({ currentPage, totalPages, onPageChange, onPrevChange, onNextChange, lengthData, showingData }) => {

    const pageRange = Array.from({ length: totalPages }, (_, index) => index + 1);
    
    return (
        <div>
            <div className='flex items-center justify-between mt-[30px]'>
                <h1 className='text-[#A098AE] text-[10px] '>Showing 1-{showingData} from {lengthData} data</h1>
                <div className='flex items-center gap-[8px]'>
                    <button onClick={onPrevChange}>
                        <MdKeyboardArrowLeft className='text-[#A098AE]'/>
                    </button>
                    {pageRange.map((page) => (
                        <button key={page} className={currentPage === page ? 'bg-[#780000] rounded-[6px] w-[24px] h-[24px] flex items-center justify-center' : 'bg-[#780000] rounded-[6px] w-[24px] h-[24px] bg-opacity-10 flex items-center justify-center'} onClick={() => onPageChange(page)}>
                            <h1 className={currentPage === page ? 'text-white text-[10px]' : 'text-[#780000] text-[10px]'}>{page}</h1>
                        </button>
                    ))}
                    <button onClick={onNextChange}>
                        <MdKeyboardArrowRight className='text-[#A098AE]'/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Pagination;