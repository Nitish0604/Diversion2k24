import React from 'react'


const Blogs = () => {


  function Kid0() {
    console.log("nitish");
    document.getElementById('a').style.display = 'block';
    document.getElementById('b').style.display = 'none';
    document.getElementById('c').style.display = 'none';
    document.getElementById('d').style.display = 'none';
    document.getElementById('e').style.display = 'none';

  };


  function Kid1() {
    console.log("nitish");
    document.getElementById('a').style.display = 'none';
    document.getElementById('b').style.display = 'block';
    document.getElementById('c').style.display = 'none';
    document.getElementById('d').style.display = 'none';
    document.getElementById('e').style.display = 'none';

  };
  function Kid2() {
    console.log("nitish");
    document.getElementById('a').style.display = 'none';
    document.getElementById('b').style.display = 'none';
    document.getElementById('c').style.display = 'block';
    document.getElementById('d').style.display = 'none';
    document.getElementById('e').style.display = 'none';

  };
  function Kid3() {
    console.log("nitish");
    document.getElementById('a').style.display = 'none';
    document.getElementById('b').style.display = 'none';
    document.getElementById('c').style.display = 'none';
    document.getElementById('d').style.display = 'block';
    document.getElementById('e').style.display = 'none';

  };
  function Kid4() {
    console.log("nitish");
    document.getElementById('a').style.display = 'none';
    document.getElementById('b').style.display = 'none';
    document.getElementById('c').style.display = 'none';
    document.getElementById('d').style.display = 'none';
    document.getElementById('e').style.display = 'block';

  };

  //   function Kids() {
  //     var myElement = document.getElementById('kid');
  //     console.log(myElement);  // Check the value of myElement
  //     if (myElement) {
  //         myElement.style.display = 'block';
  //     } else {
  //         console.error("Element not found!");
  //     }
  // }


  return (
    <div className='w-full h-fit overflow-x-hidden flex flex-col p-4'>
      <div>
      <p className='text-[2rem] flex justify-center '>Blogs</p>
      <p className='text-[1rem] flex justify-center text-green-600'>
        "Unveiling the Human Side of Healthcare"
      </p>
      </div>
     
      <div className='flex w-full mt-5'>
        {/* right button*/}

        <div className='w-[20%]  bg-white  '>
          
          <button className='w-full h-[50px] bg-slate-100 mb-1 flex items-center p-4 hover:bg-blue hover:text-white 'onClick={Kid0} >
            Kids Teeth Care
          </button>
          
            <button className='w-full h-[50px] bg-slate-100 mb-1 flex items-center p-4 hover:bg-blue hover:text-white ' onClick={Kid1}>
              Child care
            </button>
          

          <button className='w-full h-[50px] bg-slate-100 mb-1 flex items-center p-4 hover:bg-blue hover:text-white'onClick={Kid2} >
          Nutrition Tips For Kids
          </button>
          <button className='w-full h-[50px] bg-slate-100 mb-1 flex items-center p-4 hover:bg-blue hover:text-white'onClick={Kid3}>
          Causes of PCOS
          </button>
          <button className='w-full h-[50px] bg-slate-100 mb-1 flex items-center p-4 hover:bg-blue hover:text-white'onClick={Kid4}>
          Mental Health Care 
          </button>
          
          


        </div>

        {/* left */}
        <div className='w-[80%] h-full bg-white right-1 border-2 p-6 relative overflow-scroll dashboardScroll '  >

          {/* Kids Teeth Care */}
          <div className='w-full h-full 'id='a' >
            <div className='w-full flex justify-between '>
              <div className='ml-5'>
                <h1 className='text-[2.5rem]  text-slate-500'> Kids Teeth Care </h1>
                <div className='w-[20%] h-[2px] bg-red-600'></div>
                <h1 className='text-[1.2rem]  font-semibold mt-4'> Taking Care Of Your Child's Teeth </h1>
                <p className='mt-5'>Healthy teeth are important to the overall health of a child. Good dental care for a child begins even before he/she gets her first tooth visible. As we cannot see any tooth in the baby's mouth does not mean those teeth are not there. Teeth development begins while the baby is still in the mother's womb. The poor dental care may lead to oral infection, disease, or other teeth problems.
                </p>
                <h1 className='text-[1.2rem]  font-semibold mt-4'> Tips for the child's dental care </h1>
                <p>
                  1. Develop a habit of brushing the teeth in early age.<br /> 2. Before the baby starts teething, clean the gums with damp washcloth. <br /> 3. Once the baby gets the teeth, start using soft-bristled toothbrush and a small amount of fluoride toothpaste.<br /> 4. If two of the child's teeth touch, start the flossing.<br /> 5. Excess sugar in food and drinks convert into acid which forms cavities in teeth. Hence, make a habit of washing your mouth properly with water or toothpaste all the time.<br /> 6. Develop a habit in kids to limit or avoid sugary foods, juices, candies etc which leads to dental cavities.
                </p>

              </div>

              <img className="size-[300px] rounded-md " src='/close-up-boy-dentist.jpg' alt=''></img>
            </div>

          </div>

          {/* child care */}

          <div  className='w-full h-full hidden ' id='b' >
            <img className="size-[300px] rounded-md absolute right-0" src='/Premature-Babies.jpg' alt=''></img>
            <div className='ml-5'>
              <h1 className='text-[2.2rem]  text-slate-500'>How To Take Care Of Premature Babies </h1>
              <div className='w-[20%] h-[2px] bg-red-600'></div>
              <h1 className='text-[1.2rem]  font-semibold mt-4'> Taking Care Of Your Child's  </h1>
              <p className='mt-5 w-[65%]'>Clinically if a baby is born too soon i.e. before 37 weeks of pregnancy, it is called a preterm or premature baby. Premature births in babies cause low birth weight and also involve a very high risk of deaths and permanent and significant impairments in them.

              </p>
              <h1 className='text-[1.2rem]  font-semibold mt-4'> NICUs are headed by specially qualified doctors known as Neonatologists </h1>
              <p> NICUs typically require the following instruments or facilities :<br />
                1. A heated open cot or a covered incubator to the right body temperature of babies.<br />
                2. To help with breathing - Ventilators<br />
                3. Machines to give administered amounts of fluids and medicines to the babies<br />

                4. special cooling beds which help babies to reduce brain injuries who have had a difficult birth.<br />
                5. Other machines to provide babies with treatment under lights, or phototherapy in case of  Jaundice.<br />
                6. Machines to monitor brain functions.<br />
                7. X-ray and Ultra-sound machines
              </p>

            </div>



          </div>

          {/* Nutrition Tips For Kids */}
          <div  className='w-full h-full hidden 'id='c' >
            <img className="size-[260px] rounded-md absolute right-[0]" src='https://nutritionsource.hsph.harvard.edu/wp-content/uploads/2016/01/KidsHealthyEatingPlate_Jan2016.jpg' alt=''></img>
            <div className='ml-5'>
              <h1 className='text-[2.2rem]  text-slate-500'>Nutrition Tips For Kids</h1>
              <div className='w-[20%] h-[2px] bg-red-600'></div>
            
              <p className='mt-5 w-[65%]'>Most of the parents nowadays are looking for help in raising healthy kids as they have busy schedules. Kids as well on the other hand are involved in many school and extra-curricular activities. In view of this it is really important to encourage kids to eat right and maintain healthy food habits.

              </p>
              <h1 className='text-[1.2rem]  font-semibold mt-4 w-[65%]'> Below rules which will teach and support your kids in eating  healthy : </h1>
              <p>• Breakfast - Hard boiled eggs, toast, and an apple, Peanut butter on whole-grain toast.<br/>
                  o Egg sandwich on whole-wheat bread.<br/>
                  o Peanut butter on whole-grain toast.<br/>
                  o Hard boiled eggs, toast, and an apple.<br/>
                  o Yogurt
              </p>
              <p>• Start the day with a protein rich breakfast – having a balanced and protein rich  breakfast help kids stay fuller longer.</p> <br/>
              <p>• Limit Sugar Intake – Sugar is a natural ingredient in many foods such as fruits, grains, vegetables and dairy products. Many foods also have added sugar which just add no calories to diet. As a side effect, it can cause hyperactivity, obesity, mood disorders and type 2 diabetes.</p>

            </div>



          </div>

          {/* Causes of PCOS */}

          <div  className='w-full h-full  hidden' id='d' >
            <img className="size-[300px] rounded-md absolute right-0" src='/Untitled_20design_20(11).png' alt=''></img>
            <div className='ml-5'>
              <h1 className='text-[2.2rem]  text-slate-500 w-[70%]'>What are the Causes of PCOS and What are the Treatments for PCOS ? </h1>
              <div className='w-[30%] h-[2px] bg-red-600'></div>
              <p className='mt-5 w-[65%]'>Polycystic Ovary Syndrome, commonly known as PCOS, is a complex hormonal disorder that affects millions of women worldwide. It can lead to a variety of health issues, including irregular periods, weight gain, and fertility problems. In this informative blog, we will explore the causes of PCOS and discuss effective treatments for PCOS to manage and alleviate its symptoms.
              </p>
              <h1 className='text-[1.2rem]  font-semibold mt-4'> Causes of PCOS  </h1>
              <h1 className='text-[1.2rem]  font-semibold mt-4'> 1. Hormonal Imbalance: </h1>
              <p>COS is primarily caused by a hormonal imbalance in the body. Women with PCOS often have higher levels of androgens, which are often referred to as "male hormones." This imbalance disrupts the normal functioning of the ovaries and can lead to the formation of small cysts on the ovaries.</p>
              <h1 className='text-[1.2rem]  font-semibold mt-4'> 2. Insulin Resistance: </h1>
              <p>Insulin resistance is another significant factor contributing to PCOS. When the body's cells do not respond properly to insulin, the pancreas produces more insulin to compensate. Elevated insulin levels can stimulate the ovaries to produce more androgens, worsening hormonal imbalances.</p>
              <h1 className='text-[1.2rem]  font-semibold mt-4'> 3. Lifestyle Factors: </h1>
              <p>Sedentary lifestyles, poor diet choices, and obesity can increase the risk of PCOS. Maintaining a healthy weight through regular exercise and a balanced diet can help prevent or manage PCOS symptoms.</p>


            </div>



          </div>

          {/* Mental Health Care Aspects */}

          <div  className='w-full h-full  hidden' id='e' >
            <img className="size-[300px] rounded-md absolute right-0" src='/mental.png' alt=''></img>
            <div className='ml-5'>
              <h1 className='text-[2.2rem]  text-slate-500 w-[60%]'>Mental Health Care Aspects</h1>
              <div className='w-[20%] h-[2px] bg-red-600'></div>
              
              <p className='mt-5 w-[65%]'>Mental health encompasses our psychological, emotional and social well-being in general. In today's modern world, mental health has become a large issue worldwide which is to be treated equally with other physical illnesses. It is now clinically proven that our mental health affects how we think, act and feel throughout our life from childhood till adulthood.
              </p>
              <h1 className='text-[1.2rem]  font-semibold mt-4'> There are many factors which are detrimental to mental health: </h1>
              <p>
              1. Genetical Issues<br/>
              2. Trauma or Abuse<br/>
              3. Mental health issues in Family        
              </p>
              <p>Identifying and treating mental health issues does not just improve our day-to-day activities or functioning but can also help us limit some of our physical health problems which are directly related to our mental health.<br/>
              In view of all this and as people are being more aware of their mental wellness, Psychiatry and Mental Health Care and Treatment has now become a very integral unit of any hospital.</p>


            </div>



          </div>



        </div >

      </div>


    </div>




  )
}

export default Blogs
