const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    return  blogs.length === 0
    ?   0
    :   blogs.map(blog => blog.likes).reduce((edel, seur) => edel + seur);
}

const favoriteBlog = (blogs) => {
    
    const favorite = blogs.reduce(function(edel, seur) {
      return (edel.likes > seur.likes) ? edel : seur
    }) 
    console.log("FavoriteBlog on",favorite)
    return favorite.likes
    
  }

const mostBlogs = (blogs) => {

    let authors = blogs.map(blog => blog.author);
    
    var count = 1;
    var kpl = 0;
    var author;
    for (var i=0; i<authors.length; i++)
    {
        for (var j=i; j<authors.length; j++)
        {
            if (authors[i] == authors[j]) kpl++;
            if (count<kpl) {
                count=kpl; 
                author = authors[i];
            }
        }
        kpl=0;
    }
    return blog = {author,count};

    }

     
    


  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
  }