export const SearchProducts = ({setSearch})=> {
     return <div>
        <input type="text" placeholder="search a candy" onChange={
            (click) => setSearch(click.target.value)
        }/> 
        </div> 
}