const sortMedias = (items, option ) => {
    if(option === "popularity"){
           items.sort(function (a, b) {
        return b.likes - a.likes;
      });
    }
    else if(option === "date"){
           items.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });
    }
    else if(option === "price"){
           items.sort(function (a, b) {
        return b.price - a.price;
      });
    }

 
}

