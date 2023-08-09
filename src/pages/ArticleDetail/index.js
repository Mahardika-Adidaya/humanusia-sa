import React, { useState, useEffect } from 'react'
import Api from '../../Api'
import { useLocation } from 'react-router-dom'

const ArticleDetail = () => {

    const params = useLocation()
    console.log(params)
    const [ArticleContent, setArticleContent] = useState('')

    const GetArticle = async() => {
        try {
            const response = await Api.GetArticleByID(localStorage.getItem('hris-token'), params.state.articleId)
            setArticleContent(response.data.data.description)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        GetArticle()
    }, [])

    return (
        <div className='text-sm text-[#737373]' dangerouslySetInnerHTML={{ __html: ArticleContent }}></div>
    )
}

export default ArticleDetail