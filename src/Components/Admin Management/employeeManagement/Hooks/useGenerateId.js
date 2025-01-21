const useGenerateId = ()=>{
    return(department)=>{
        const randomNum = Math.floor(Math.random()*9000)+1000
        return `${department.toUpperCase().slice(0,4)} ${randomNum}`
    }
}
export default useGenerateId