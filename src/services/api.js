
let URI = "http://10.110.60.166:4000";
export const searchEnteredProduct = (searchQuery,page,limit) => {
    const URL = `http://10.110.60.166:4000/products?price=${searchQuery}&_page=${page}&_limit=${limit}`      //&page=1&per_page=10
  
    return fetch(URL)
    .then(response => {
    //    console.log("I am API "+URL);
      return response.json();
      
    })
    .then(result => {
      console.log(result);
      const products=result
      return result;
        // return result.data.map(({ id, title, price, rating, reviews,additionalInfo }) => ({
        //   id,
        //   title,
        //   price,
        //   rating,
        //   reviews,
        //   additionalInfo
        // }));
    });
  };
   // const response =fetch(`${URI}/products?price=${this.state.searchProduct}&_page=${this.props.page}&_limit=${this.props.limit}`,{
        //     method:'POST',
        //     headers:{
        //         Accept:'application/json',
        //         'Content-Type':'application/json',
        //     },
        //     body:JSON.stringify({price:this.state.searchProduct})
        // });
        // console.log("response= "+response);