import React from 'react'
import { Link } from 'react-router-dom'

function Newsitem (props) {

        let {title, description, imageUrl, newsUrl, author, date} = props
        return (
            <div className='my-3'>
                <div className="card" >
                    <img style={{height:"10rem"}} src={imageUrl? imageUrl:"https://lh3.googleusercontent.com/J6_coFbogxhRI9iM864NL_liGXvsQp2AupsKei7z0cNNfDvGUmWUy20nuUhkREQyrpY4bEeIBuc=s0-w300-rw"} className="card-img-top img-fluid" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{title.slice(0,50)}</h5>
                            <p className="card-text" >{description.slice(0,100)}</p>
                            <p className="card-text"><small className="text-muted">By {author? author :"Unknown"} on {new Date(date).toGMTString()}</small></p>
                            <Link to={newsUrl} target='_blank' rel='noopener' className="btn btn-sm btn-dark">Read More</Link>
                        </div>
                </div>
            </div>
        )
}
export default Newsitem
