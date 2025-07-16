import "./Header.css"
const Header = ()=>{
return(
  <header className="w-full border-b-1 border-stone-300 h-[55px] px-5 flex items-center justify-between">
    <div>
      <span>user name</span>
      <a href="" className="underline underline-offset-1 px-3 text-xs">logout</a>
    </div>
    <div className="flex gap-2">
      {/* <select className="py-2 px-4 w-[90px] flex-none border-gray-200 rounded-lg text-sm focus:border-gray-700 focus:ring-gray-700">
        <option selected="">전체</option>
        <option>TODO</option>
        <option>MEMO</option>
        <option>3</option>
      </select> */}
      <div className="relative">
        <svg className="w-5 absolute z-10 top-[50%] left-[10px] transform-[translateY(-50%)]" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#7a7a7a" fill-rule="evenodd" d="M4 9a5 5 0 1110 0A5 5 0 014 9zm5-7a7 7 0 104.2 12.6.999.999 0 00.093.107l3 3a1 1 0 001.414-1.414l-3-3a.999.999 0 00-.107-.093A7 7 0 009 2z"></path></g></svg>
        <input type="text" className="py-[7px] ps-[35px] pe-3 w-[170px] flex-none border-0 rounded-lg drop-shadow-md text-sm focus:border-gray-400 focus:ring-gray-400" placeholder="검색어를 검색해주세요." />
      </div>

    </div>
  </header>
)
}
export default Header;