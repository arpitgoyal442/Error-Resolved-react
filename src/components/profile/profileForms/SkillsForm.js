import {useState} from 'react'
import XIcon from "@heroicons/react/solid/XCircleIcon";
import CheckIcon from "@heroicons/react/solid/CheckCircleIcon";

const skills = [
  "C++",
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Redux",
  "Node.js",
  "Express",
  "MongoDB",
  "MySQL",
  "Firebase",
  "Git",
  "MERN"
]

const SkillsForm = ({setShowModal}) => {
  const [tempSkills, setTempSkills] = useState(skills),
  [newSkill, setNewSkill] = useState("");
  
  const cancel = () => {
		setTempSkills(skills);
		setShowModal(false);
	};

  const updateSingleSkill = (skill, index) => {
    const tskills = [...tempSkills];
    tskills[index] = skill;
    setTempSkills(tskills);
  }
  const removeSkill = (index) => {
    const tskills = [...tempSkills];
    tskills.splice(index, 1);
    setTempSkills(tskills);
  }
  const addSkill = () => {
    const tskills = [...tempSkills];
    tskills.push(newSkill);
    setTempSkills(tskills);
    setNewSkill("")
  }

  return (
    <form className="max-w-xl w-full p-4 rounded-lg border bg-white" onSubmit={(e) => e.preventDefault()}>
      <h2 className="text-xl font-medium -mx-4 px-4 pb-4 mb-4 border-b">Skills</h2>
      <div className='grid grid-cols-2 p-3 gap-2 max-h-96 overflow-y-scroll no-scrollbar'>
        {tempSkills.map((skill, index) => (
          <div key={index} className='relative group'>
            <XIcon onClick={() => removeSkill(index)} className='hidden group-hover:block h-6 w-6 absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer' />
            <input autoFocus className='w-full outline-none p-1 text-center border rounded-md' type="text" value={skill} onChange={(e) => updateSingleSkill(e.target.value, index)} />
          </div>
        ))}
        <div className='relative group'>
        <CheckIcon onClick={addSkill} className='hidden group-hover:block h-6 w-6 absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer' />
        <input className='w-full outline-none p-1 text-center border rounded-md' type="text" placeholder='New Skill ...' value={newSkill} onChange={(e) => setNewSkill(e.target.value)} />
        </div>
      </div>
      <div className="border-t mt-2 pt-2 -mx-4 px-4 flex items-center justify-end gap-x-2">
				<button
					onClick={cancel}
					className="border border-highlight text-highlight px-3 py-1 rounded-lg hover:shadow-md"
				>
					Cancel
				</button>
				<button type="submit" className="bg-highlight text-white px-3 py-1 rounded-lg hover:shadow-md">
					Save
				</button>
			</div>
    </form>
  )
}

export default SkillsForm
