import React from 'react'
import SkeletonLoading from '../ui/SkeletonLoading'
import "../../pages/home.css"
function Search({ type, isLoading, searchResults, handleClick, search }) {

  return (
    <div className={`${search ? "scrollbar-hide overflow-y-scroll h-[250px] mb-5 bg-[#fff] flex flex-col gap-y-3 pt-3" : "hidden"}`}>

      {
        isLoading ? <SkeletonLoading height={55} count={3} /> : (
          searchResults.length > 0 ? searchResults?.map((e) => {
            return (
              <div key={e._id} className='flex items-center justify-between'>
                <div className='flex items-center gap-x-2'>

                  <img className='w-[42px] h-[42px] rounded-[25px]' src={!e.profilePic ? "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" : e.profilePic} alt="" />
                  <div className='flex flex-col gap-y-[1px]'>
                    <h5 className='text-[15px] text-[#111b21] tracking-wide font-medium'>{e.name}</h5>
                    <h5 className='text-[12px] text-[#68737c] tracking-wide font-normal'>{e.email}</h5>
                  </div>
                </div>
                <button onClick={() => handleClick(e)} className='bg-[#0086ea] px-3 py-2 text-[10.6px] tracking-wide text-[#fff]'>Add</button>
              </div>
            )
          }) : <span className='text-[13px]'>No results found</span>
        )

      }
    </div>
  )
}

export default Search