import React, { useEffect, useRef, useState } from 'react'
import { Button, Input, InputSearch, Modal, ModalDelete, Pagination } from '../../components'
import { Blog1 } from '../../assets'
import { AiOutlineCalendar, AiOutlineUser } from 'react-icons/ai'
import { HiArrowNarrowRight } from 'react-icons/hi'
import { TbEdit } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import { Editor } from '@tinymce/tinymce-react'
import { BiTrashAlt } from 'react-icons/bi'
import Api from '../../Api'
import { debounce } from 'lodash'
import toast from 'react-hot-toast'
import moment from 'moment/moment'
import { handleLinkArticle } from '../../utils'

const Article = () => {

    const editorRef = useRef(null);

    const limit = 3
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState('')
    const [refresh, setRefresh] = useState(false)

    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const [dataArticle, setDataArticle] = useState('')
    const [banner, setBanner] = useState('')
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [content, setContent] = useState('')

    const getArticle = async() => {
        try {
            const response = await Api.GetArticle(localStorage.getItem('hris-token'), currentPage, limit, '')
            setTotalPages(response.data.data.totalPages)
            setDataArticle(response.data.data.articles)
        } catch (error) {
            console.log(error)
        }
    }

    const debouncedSearch = debounce(async(search) => {
        try {
            const response = await Api.GetAdmin(localStorage.getItem('hris-token'), currentPage, limit, search)
            setDataArticle(response.data.data.articles)
        } catch (error) {
            console.log(error)
        }
    }, 300)

    const handleSearch = (e) => {       
        const search = e.target.value
        debouncedSearch(search) 
    }
    
    const handleViewImage = (e) => {
        const maxSize = 2 * 1024 * 1024
        const allowedExtensions = ['jpg', 'jpeg', 'png'];
        const file = e.target.files[0]
        const fileExtension = file.name.split('.').pop().toLowerCase();
        if (file && file.size > maxSize){
            toast.error('gambar harus < 2MB')
            setBanner(null)
        } else if (!allowedExtensions.includes(fileExtension)){
            toast.error('file harus jpg, jpeg, atau png')
        } else {
            const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = () => {
                setBanner(reader.result)
            };
        }
    }
    
    const postArticle = async() => {
        try {
            const data = {
                image: banner,
                title: title,
                author: author,
                description: content
            }
            await Api.PostArticle(localStorage.getItem('hris-token'), data)
            setShowCreateModal(!showCreateModal)
            setRefresh(true)
            toast.success('Success to send data article!')
        } catch (error) {
            toast.error('Failed to send data article!')
        }
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setRefresh(true)
    };
    
    const handlePrevChange = () => {
        if(currentPage === 1) {
            setCurrentPage(1)
        } else {
            setCurrentPage(currentPage - 1);
        }
        setRefresh(true)
    };
    
    const handleNextChange = () => {
        if(currentPage === totalPages) {
            setCurrentPage(totalPages)
        } else {
            setCurrentPage(currentPage + 1);
        }
        setRefresh(true)
    };

    useEffect(() => {
        getArticle()
        setRefresh(false)
    }, [refresh])

    return (
        <div>
            <Modal
                activeModal={showCreateModal}
                title={'Add New Article'}
                buttonClose={ () => setShowCreateModal(!showCreateModal)}
                width={'850px'}
                content= {
                    <div className='space-y-[25px]'>
                        <Input
                            title={'Banner'}
                            placeholder={'Upload image for banner'}
                            type={'file'}
                            required={true}
                            onChange={handleViewImage}
                        />
                        <Input
                            title={'Title'}
                            placeholder={'Input Title'}
                            type={'text'}
                            required={true}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <Input
                            title={'Author'}
                            placeholder={'Input Author Name'}
                            type={'text'}
                            required={true}
                            onChange={(e) => setAuthor(e.target.value)}
                        />

                        {/* Tiny MCE */}
                        <Editor
                            apiKey='hr8girncv2b9d5bcs05bus9xu17rg77dua0juw5nvqcz3o61'
                            onEditorChange={(newValue, editor) => {
                                setContent(newValue)
                            }}
                            onInit={(evt, editor) => editorRef.current = editor}
                            init={{
                                height: 500,
                                menubar: false,
                                plugins: 'mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
                                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}
                        />

                        <div className='flex items-center justify-end gap-[12px] mt-5'>
                            <button onClick={ () => setShowCreateModal(!showCreateModal)} className='bg-[#ECECEC] text-[#003049] text-sm rounded-[6px] w-[100px] py-[10px] px-[25px]'>Cancel</button>
                            <button onClick={postArticle} className='bg-[#0E5073] text-white text-sm rounded-[6px] w-[100px] py-[10px] px-[25px]'>Submit</button>
                        </div>
                    </div>
                }
            />
            <Modal
                activeModal={showUpdateModal}
                title={'Update Article'}
                buttonClose={ () => setShowUpdateModal(!showUpdateModal)}
                width={'850px'}
                content= {
                    <div className='space-y-[25px]'>
                        <Input
                            title={'Banner'}
                            placeholder={'Upload image for banner'}
                            type={'file'}
                            required={true}
                            onChange={(e) => setBanner(e.target.value)}
                        />
                        <Input
                            title={'Title'}
                            placeholder={'Input Title'}
                            type={'text'}
                            required={true}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <Input
                            title={'Author'}
                            placeholder={'Input Author Name'}
                            type={'text'}
                            required={true}
                            onChange={(e) => setAuthor(e.target.value)}
                        />

                        {/* Tiny MCE */}
                        <Editor
                            apiKey='hr8girncv2b9d5bcs05bus9xu17rg77dua0juw5nvqcz3o61'
                            onEditorChange={(newValue, editor) => {
                                setContent(newValue)
                            }}
                            onInit={(evt, editor) => editorRef.current = editor}
                            init={{
                                height: 500,
                                menubar: false,
                                plugins: 'mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
                                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}
                        />

                        <div className='flex items-center justify-end gap-[12px] mt-5'>
                            <button onClick={ () => setShowUpdateModal(!showUpdateModal)} className='bg-[#ECECEC] text-[#003049] text-sm rounded-[6px] w-[100px] py-[10px] px-[25px]'>Cancel</button>
                            <button onClick={''} className='bg-[#0E5073] text-white text-sm rounded-[6px] w-[100px] py-[10px] px-[25px]'>Submit</button>
                        </div>
                    </div>
                }
            />
            <ModalDelete
                activeModal={showDeleteModal}
                buttonClose={() => setShowDeleteModal(!showDeleteModal)}
                submitButton={''}
            />
            <div className='px-[20px] py-[36px] bg-white rounded-xl space-y-[33px]'>
                <div className='flex items-center justify-between'>
                    <div className='space-y-2'>
                        <h1 className='text-[#454545] font-semibold text-[20px]'>Article</h1>
                        <h1 className='text-[#737373] text-[10px]'>list of article</h1>
                    </div>
                    <div className='flex items-center gap-[16px]'>
                        <InputSearch
                            onChange={handleSearch}
                        />
                        <Button 
                            onClick={() => setShowCreateModal(!showCreateModal)}
                            title={'Add New Article'}
                            iconAdd={true}
                        />
                    </div>
                </div>
                <div className='grid grid-cols-12 gap-3'>
                    { dataArticle.length === 0 ?
                        <div className='col-span-12 flex items-center justify-center h-[100px]'>
                            <h1 className='text-[#A098AE] text-12 '>Data Empty</h1>
                        </div>
                        :
                        Object.values(dataArticle).map((data, index) => {
                            console.log(data)
                            return (
                                <div className='col-span-3' key={index}>
                                    <div className='relative'>
                                        <img src={handleLinkArticle(data.image)} className='w-full h-[232px] object-cover rounded-xl' alt='Blog 1'/>
                                        <div className='absolute top-3 right-3 flex items-center gap-2'>
                                            <button onClick={() => setShowUpdateModal(!showUpdateModal)} className='p-2 rounded-full bg-white'>
                                                <TbEdit className='text-[#147DB4]'/>
                                            </button>
                                            <button onClick={() => setShowDeleteModal(!showDeleteModal)} className='p-2 rounded-full bg-white'>
                                                <BiTrashAlt className='text-[#B70000]'/>
                                            </button>
                                        </div>
                                    </div>
                                    <div className='space-y-[17px]'>
                                        <h1 className='text-[#003049] font-bold text-[24px] line-clamp-2'>{data.title}</h1>
                                        <div className='flex items-center gap-[11px]'>
                                            <div className='flex items-center gap-[7px]'>
                                                <AiOutlineCalendar className='text-sm text-[#737373]'/>
                                                <h1 className='text-[#737373] text-sm'>{moment(data.createdAt).format('MMMM, DD YYYY')}</h1>
                                            </div>
                                            <div className='w-[1.5px] h-[26px] bg-[#CACACA] rounded-full'/>
                                            <div className='flex items-center gap-[7px]'>
                                                <AiOutlineUser className='text-sm text-[#737373]'/>
                                                <h1 className='text-[#737373] text-sm'>{data.author}</h1>
                                            </div>
                                        </div>
                                        <div className='text-sm text-[#737373] line-clamp-2' dangerouslySetInnerHTML={{ __html: data.description }}></div>
                                        <Link to={'/detail-blog/Humanusia-sebagai-Rekomendasi-Sistem-Manajemen-HR-dengan-Harga-Terjangkau'} className='flex items-center gap-[15px]'>
                                            <h1 className='text-[#780000] text-sm font-medium'>Lihat Detail</h1>
                                            <HiArrowNarrowRight className='text-[#780000]'/>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <Pagination
                    currentPage={currentPage} 
                    totalPages={totalPages}
                    lengthData={dataArticle.length} 
                    showingData={!dataArticle.length < limit ? dataArticle.length : limit}
                    onPageChange={handlePageChange}
                    onPrevChange={handlePrevChange}
                    onNextChange={handleNextChange}
                />
            </div>
        </div>
    )
}

export default Article