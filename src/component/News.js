import React, { useEffect, useState } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

function News(props) {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)



    const updateNews = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ab8c818ebccf4aec9bb13d1ca06b1ddf&page=${page}&pagesize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        // props.setProgress(30)
        let parsedData = await data.json();
        // props.setProgress(70)
        setArticles(parsedData.articles || [])
        setTotalResults(parsedData.totalResults || 0)
        setLoading(false)

    }

    useEffect(() => {
        updateNews(page);
    }, [page])

    const handlePreviousClick = async () => {
        setPage(page - 1)
        // updateNews()
    }

    const handleNextClick = async () => {
        setPage(page + 1);
        // updateNews()
    }

    
    console.log('page :>> ', page);

    console.log('loading :>> ', loading);
    return (

        <div className="container my-4">
            <h1 className='text-center my-5  ' >Taaza Khabar - Top headlines</h1>
            {loading && <Spinner />}

            {/* {articles?.length > 0 && */}

            <div className="row my-5 ">
                {!loading && articles.map((element) => {
                    return <div className="col-md-4 " key={element.url}>
                        <Newsitem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                    </div>
                })}
            </div>
            {/* } */}


            <div className="container d-flex justify-content-between">
                <button type="button" disabled={page <= 1} className="btn btn-dark" onClick={handlePreviousClick}> &larr; Previous</button>
                <button type="button" disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
            </div>

        </div>
    )

}
export default News;
News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}
