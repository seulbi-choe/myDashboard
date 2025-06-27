import "./Header.css"
const Header = ()=>{
 return(
  <header className="w-full border-b-1 border-stone-300 h-[55px] px-5 flex items-center justify-between">
   <h3>header</h3>
   <div className="flex gap-2">
<select class="py-2 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600">
  <option selected="">Open this select menu</option>
  <option>1</option>
  <option>2</option>
  <option>3</option>
</select>
  <input type="text" class="py-2 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="This is placeholder" />

   </div>
  </header>
 )
}
export default Header;