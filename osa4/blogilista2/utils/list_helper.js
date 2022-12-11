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
    return favorite 
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

  
  const mostLikes = (blogs) => {
    
    likesByAuthor = Array.from(
        blogs.reduce(
            (blog, { author, likes }) => blog.set(author, (blog.get(author) || 0) + likes),
            new Map
        ).entries(),
        ([author, likes]) => ({ author, likes })
    );
    
  console.log(likesByAuthor);
  let mostLikes = likesByAuthor.reduce((max, author) => max.likes > author.likes ? max : author);
  return mostLikes;

    }



  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }