const listHelper = require('../utils/list_helper')



describe('favorite blog', () => {
  const blogs = [
      {
        title: "Ruokajono",
        author: "Kalle Teräväinen",
        url: "ruokajono.fi",
        likes: 9,
        id: "6134f376dbb2c0d60082e6ea"
      },
      {
        title: "Minä ja muoti",
        author: "Outi Pekkanen",
        url: "muotiblogi.fi",
        likes: 13,
        id: "6134f492dbb2c0d60082e6eb"
      },
      {
        title: "Juorukello",
        author: "anonyymi",
        url: "juorukello.com",
        likes: 11,
        id: "6135077a6eecceadbf60cb91"
      },
      {
        title: "Aurinkomatkoilla",
        author: "Elisa Falla",
        url: "seikkalija.es",
        likes: 7,
        id: "61363d50807fc21b0ce43fd1"
      },
      {
        title: "testi",
        author: "testi",
        url: "testi",
        likes: 20,
        id: "6136dfr3e5807fc21b0ce7d1"
      }       
    ]


    test('favorite blog', () => {
      const result = listHelper.favoriteBlog(blogs)

      const goal = {
        title: "testi",
        author: "testi",
        url: "testi",
        likes: 20,
        id: "6136dfr3e5807fc21b0ce7d1"
      };
      expect(result).toEqual(goal)
      
    })

})
