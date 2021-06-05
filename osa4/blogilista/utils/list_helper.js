const totalLikes = (blogs) => {
    return blogs.reduce((prev, curr) => prev + curr.likes, 0)
}

const returnMaxLikes = (blogs) => {
    return blogs.reduce((prev, curr) => (prev.likes < curr.likes) ? curr: prev)
}

const returnMostBlogs = (blogs) => {
    const dict = {}
    let author = ''
    dict[''] = 0
    blogs
        .forEach(
            (blog) => {
                isNaN(dict[blog.author]) ?
                    dict[blog.author] = 1 : dict[blog.author] += 1,

                (dict[author] < dict[blog.author]) ? author = blog.author : null
            })

    return {author: author, blogs: dict[author]}
}

const returnMostLikes = (blogs) => {
    const dict = {}
    let author = ''
    dict[''] = 0
    blogs
        .forEach(
            (blog) => {
                isNaN(dict[blog.author]) ?
                    dict[blog.author] = blog.likes :
                    dict[blog.author] += blog.likes,

                (dict[author] < dict[blog.author]) ? author = blog.author : null
            })

    return {author: author, likes: dict[author]}
}

module.exports = {
    totalLikes,
    returnMaxLikes,
    returnMostBlogs,
    returnMostLikes,
}
