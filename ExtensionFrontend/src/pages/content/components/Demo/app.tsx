import { useEffect } from 'react';

export default function App() {


  // const element = document.querySelectorAll('[aria-label="Android 11.0"]')
    
  // element.forEach(element=>{
  //   const anchorTag = element.querySelector('a');

  //   if(anchorTag){
  //           window.location.href = anchorTag.href;
  //   }
  // });

  useEffect(() => {
    const searchTerm = (document.getElementById('twotabsearchtextbox') as HTMLInputElement).value;
    console.log(searchTerm);

  }, []);

  return <div className="text-lime-400">content view</div>;
}