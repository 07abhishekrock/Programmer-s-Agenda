import { checkForCookies, getAllProjects } from "../libs/middleware";

export default function Home() {
  return (
    <h1>Taking You to Your Project Now ...</h1>
  )
}

export async function getServerSideProps(context){
  const [cookies_found , data] = checkForCookies(context.req);   
  
  if(cookies_found){
    const projects = await getAllProjects(data , context.req , context.res);

    let selected_project = context.req.cookies.defaultProject || null;
    if(!selected_project && projects.length > 0){
      selected_project = projects[0];
    }
    if(projects.length === 0){
      return (
        {
          redirect : {
            destination : `/addNewProject`,
            permanent : false
          }
        }
      )
    }
    return (
      {
        redirect : {
          destination : `/${selected_project.id}`,
          permanent : false
        }
      }
    )
  }
  else{
    return (
      {
        redirect : {
          destination : '/login', 
          permanent : false
        }
      }
    )
  }
}