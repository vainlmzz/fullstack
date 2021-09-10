  const { map } = require("../app");

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
    
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }


 