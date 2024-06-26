import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiTwotoneDelete } from "react-icons/ai";
import { RxUpdate } from "react-icons/rx";
import { toast } from 'react-toastify'
import ReactPaginate from 'react-paginate';
import TextClip from '../../general/TextClip';
import AuthManage from '../AuthManage';


const Feedback = ({initialData, title}) => {

  const [data, setData] = useState([]);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios(`${process.env.REACT_APP_BASE_URL}/commentFeedback`);
        setData(res.data.data)
       } catch (error) {
        console.log(error);

      }
    }
    fetchData()
  }, [])


  

  //*-------------------- react-paginate (sayfa sınırlandırma)

  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 9;
  const endOffset = itemOffset + itemsPerPage;
  const datas = data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data.length / itemsPerPage);


  
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    
    setItemOffset(newOffset);
  };

  //*-------------------- react-paginate (sayfa sınırlandırma)

  const handleDelete = async (id, commentId) => {
    //yorum ve geri bilidiirmi siliyor

    try {
      
      const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/commentFeedback/delete/${id}`)
      toast.success(res.data.message)
      setData(prevData => prevData.filter(item => item._id !== id ))

    } catch (error) {
      toast.error(error.response.data.error);
    }
    
    try {
      const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/comment/delete/${commentId}`)
      // toast.success(res.data.message)
    
    } catch (error) {
      // toast.error(error.response.data.error) 
    }

  
  }

  return (
    <div>
      <AuthManage />


      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <p className='text-lg py-2 '>{initialData? title: "Geri Bildirimler" }</p>
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>

              <th scope="col" class="px-6 py-3">
                Adı Soyad
              </th>
              <th scope="col" class="px-6 py-3">
                E-posta
              </th>
              <th scope="col" class="px-6 py-3">
                Acıklama
              </th>
              <th scope="col" class="px-6 py-3">
                Numara
              </th>
              <th scope="col" class="px-6 py-3">
                numaranın Yorumu
              </th>
              <th scope="col" class="px-6 py-3">
                Durumu
              </th>
              <th scope="col" class="px-6 py-3">
                Yorumu Sil
              </th>
            </tr>
          </thead>
          <tbody>
          {initialData && initialData.length > 0 ? (
             
              datas.slice(0, 4).map((item) => (
                <tr key={item?._id} class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <td class="px-6 py-4 min-w-[180px] lg:w-auto">
                    {item.surname}
                  </td>
                  <td class="px-6 py-4">
                    {item.mail}
                  </td>
                  <td class="px-6 py-4 min-w-[500px] lg:w-auto ">
                  {item.description} 
                  </td>

                  <td class="px-6 py-4">
                    {item.comment?.number? item.number?.number: "Yorum Bulunamadı"}
                  </td>
                  <td class="px-6 py-4 min-w-[500px] lg:w-auto ">
                  {item.comment?.comment? item.comment?.comment: "Yorum Bulunamadı" }

                  </td>

                  <td class={`px-6 py-4 ${item.comment?.status === "uncertain" ? "text-gray-500" : item.comment?.status === "trustworthy" ? "text-green-700" : item.comment?.status === "dangerous" ? "text-red-700": "" } `}>
                  {item.comment?.status === "uncertain" ? "Belirsiz" : item.comment?.status === "trustworthy" ? "Güvenilir" : item.comment?.status === "dangerous"? "Tehlikeli" :"Yorum Bulunamadı" }
                  </td>

                  <td class="px-6 py-4" onClick={() => handleDelete(item._id, item.comment?._id)}>
                    <a href="#" class="font-medium text-red-800 dark:text-blue-500 hover:underline"> <AiTwotoneDelete size={25} /> </a>
                  </td>
                </tr>
              ))
            
          ):(
            
              datas.map((item) => (
                <tr key={item?._id} class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <td class="px-6 py-4 min-w-[180px] lg:w-auto">
                    {item.surname}
                  </td>
                  <td class="px-6 py-4">
                    {item.mail}
                  </td>
                  <td class="px-6 py-4 min-w-[500px] lg:w-auto">
                    {item.description}
                  </td>

                  <td class="px-6 py-4">
                    {item.comment?.number? item.number?.number: "Yorum Bulunamadı"}
                  </td>
                  <td class="px-6 py-4 min-w-[500px] w-auto lg:w-auto">
                    {item.comment?.comment? item.comment?.comment: "Yorum Bulunamadı" }
                  </td>

                  <td class={`px-6 py-4 ${item.comment?.status === "uncertain" ? "text-gray-500" : item.comment?.status === "trustworthy" ? "text-green-700" : item.comment?.status === "dangerous" ? "text-red-700": "" } `}>
                  {item.comment?.status === "uncertain" ? "Belirsiz" : item.comment?.status === "trustworthy" ? "Güvenilir" : item.comment?.status === "dangerous"? "Tehlikeli" :"Yorum Bulunamadı" }
                  </td>

                  <td class="px-6 py-4" onClick={() => handleDelete(item._id, item.comment?._id)}>
                    <a href="#" class="font-medium text-red-800 dark:text-blue-500 hover:underline"> <AiTwotoneDelete size={25} /> </a>
                  </td>
                </tr>
              ))
            
          )

          }

          </tbody>
        </table>
        <ReactPaginate
          className='paginate dark:text-white'
          breakLabel="..."
          nextLabel="  >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="<  "
          renderOnZeroPageCount={null}
        />
      </div>

    </div>
  )
}

export default Feedback

