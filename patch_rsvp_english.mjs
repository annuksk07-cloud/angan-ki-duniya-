import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Replace the RsvpSection logic
const oldComponent = content.substring(
  content.indexOf('const RsvpSection = () => {'),
  content.indexOf('export default function App() {')
);

const newComponent = `const RsvpSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    attending: '',
    guestCount: '1',
    foodPreference: '',
    specialNeeds: 'No',
    specialNeedsText: '',
    message: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Please enter your name.";
    if (!formData.attending) newErrors.attending = "Please select attendance.";
    if (formData.attending === 'Yes, with family' && !formData.guestCount) {
       newErrors.guestCount = "Please select number of guests.";
    }
    if (formData.attending === 'Yes, with family' && !formData.foodPreference) {
       newErrors.foodPreference = "Please select food preference.";
    }
    if (formData.specialNeeds === 'Yes' && !formData.specialNeedsText.trim()) {
       newErrors.specialNeedsText = "Please enter details.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    let text = \`Kavya & Aditya Wedding RSVP\\n\\n\`;
    text += \`Name: \${formData.name}\\n\`;
    text += \`Attending: \${formData.attending}\\n\`;
    if (formData.attending === 'Yes, with family') {
       text += \`Total Guests: \${formData.guestCount}\\n\`;
       text += \`Food Preference: \${formData.foodPreference}\\n\`;
    }
    const specNeed = formData.specialNeeds === 'Yes' ? formData.specialNeedsText : formData.specialNeeds;
    text += \`Special Dietary Requirement: \${specNeed}\\n\`;
    if (formData.message.trim()) {
        text += \`Message: \${formData.message}\\n\`;
    }
    text += \`\\nLooking forward to celebrating with you!\`;

    const waNumber = '[WHATSAPP NUMBER — ADD HERE]';
    const url = \`https://wa.me/\${waNumber}?text=\${encodeURIComponent(text)}\`;
    window.open(url, '_blank');
  };

  const RadioOption = ({ name, value, label, checked, onChange }: { name: string, value: string, label: string, checked: boolean, onChange: (e: any) => void }) => (
    <label className="flex items-start sm:items-center gap-3 cursor-pointer group mb-3 sm:mb-0">
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="hidden" />
      <div className="w-5 h-5 rounded-full border border-[#B78B4A]/80 flex-shrink-0 flex items-center justify-center group-hover:border-[#5A1520] transition-colors mt-0.5 sm:mt-0">
        <div className={\`w-2.5 h-2.5 rounded-full bg-[#5A1520] transition-opacity \${checked ? 'opacity-100' : 'opacity-0'}\`} />
      </div>
      <span className="text-[#4A2014] font-noto text-[15px] sm:text-[17px] opacity-90">{label}</span>
    </label>
  );

  return (
    <section className="relative w-full flex flex-col items-center text-center bg-[#F8F0DF] py-12 sm:py-20 md:py-28 lg:py-32 min-h-[100svh] md:min-h-[82svh] lg:min-h-0 overflow-hidden">
      <motion.img 
        initial={{ scale: 1.05, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1, transition: { duration: 3, ease: "easeOut" } }}
        viewport={{ once: true, amount: 0.1 }}
        src={ASSETS.familyBg}
        alt=""
        className="absolute inset-0 w-full h-full object-fill z-0 pointer-events-none origin-center" 
      />
      
      <div className="relative z-10 w-full max-w-[90%] sm:max-w-xl md:max-w-2xl mx-auto flex flex-col items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0, y: 15 },
            visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut", staggerChildren: 0.15 } }
          }}
          className="w-full flex flex-col items-center relative"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(255,248,235,0.7)_0%,transparent_70%)] pointer-events-none blur-3xl -z-10" />

          <motion.h2 variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="text-[#5A1520] text-[28px] sm:text-4xl md:text-5xl font-tiro mb-6 sm:mb-8 drop-shadow-sm text-center w-full">RSVP</motion.h2>
          
          <motion.div variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }} className="mb-10 sm:mb-12">
            <img src={ASSETS.goldDivider} alt="" className="w-24 sm:w-32 h-auto opacity-80 drop-shadow-sm" />
          </motion.div>

          <motion.form 
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} 
            onSubmit={handleWhatsAppSubmit}
            className="w-full flex flex-col gap-6 sm:gap-8 text-left bg-white/40 backdrop-blur-sm px-6 py-8 sm:p-10 rounded-xl border border-[#B78B4A]/20 shadow-[0_8px_30px_rgba(90,21,32,0.05)]"
          >
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label className="text-[#5A1520] font-amita text-[18px] sm:text-[20px]">Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Please enter your full name"
                className="w-full bg-transparent border-b border-[#B78B4A]/40 py-2.5 text-[#4A2014] font-noto text-[15px] sm:text-[17px] focus:outline-none focus:border-[#5A1520] transition-colors placeholder-[#4A2014]/40"
              />
              {errors.name && <span className="text-red-700 font-noto text-sm mt-1">{errors.name}</span>}
            </div>

            {/* Attendance */}
            <div className="flex flex-col gap-3">
              <label className="text-[#5A1520] font-amita text-[18px] sm:text-[20px]">Will you be attending?</label>
              <div className="flex flex-col sm:flex-row sm:gap-8">
                <RadioOption 
                  name="attending" 
                  value="Yes, with family" 
                  label="Yes, with family" 
                  checked={formData.attending === 'Yes, with family'} 
                  onChange={(e) => setFormData({...formData, attending: e.target.value})} 
                />
                <RadioOption 
                  name="attending" 
                  value="No, unable to attend" 
                  label="No, unable to attend" 
                  checked={formData.attending === 'No, unable to attend'} 
                  onChange={(e) => setFormData({...formData, attending: e.target.value})} 
                />
              </div>
              {errors.attending && <span className="text-red-700 font-noto text-sm mt-1">{errors.attending}</span>}
            </div>

            <AnimatePresence>
              {formData.attending === 'Yes, with family' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: 'auto' }} 
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-col gap-6 sm:gap-8 overflow-hidden"
                >
                  <div className="w-full h-[1px] bg-[#B78B4A]/20" />
                  
                  {/* Guest Count */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[#5A1520] font-amita text-[18px] sm:text-[20px]">Total Guests</label>
                    <select 
                      value={formData.guestCount}
                      onChange={(e) => setFormData({...formData, guestCount: e.target.value})}
                      className="w-full bg-transparent border-b border-[#B78B4A]/40 py-2.5 text-[#4A2014] font-noto text-[15px] sm:text-[17px] focus:outline-none focus:border-[#5A1520] transition-colors appearance-none cursor-pointer"
                    >
                      {[1,2,3,4,5,6,7,8,9,10].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                  </div>

                  {/* Food Preference */}
                  <div className="flex flex-col gap-3">
                    <label className="text-[#5A1520] font-amita text-[18px] sm:text-[20px]">Food Preference</label>
                    <div className="flex flex-col sm:flex-row sm:gap-8">
                      <RadioOption name="food" value="Veg" label="Veg" checked={formData.foodPreference === 'Veg'} onChange={(e) => setFormData({...formData, foodPreference: e.target.value})} />
                      <RadioOption name="food" value="Non-Veg" label="Non-Veg" checked={formData.foodPreference === 'Non-Veg'} onChange={(e) => setFormData({...formData, foodPreference: e.target.value})} />
                      <RadioOption name="food" value="Jain" label="Jain" checked={formData.foodPreference === 'Jain'} onChange={(e) => setFormData({...formData, foodPreference: e.target.value})} />
                    </div>
                    {errors.foodPreference && <span className="text-red-700 font-noto text-sm mt-1">{errors.foodPreference}</span>}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Special Needs */}
            <div className="flex flex-col gap-3">
              <label className="text-[#5A1520] font-amita text-[18px] sm:text-[20px]">Any special dietary requirement / allergy?</label>
              <div className="flex flex-col sm:flex-row sm:gap-8">
                <RadioOption name="specialNeeds" value="No" label="No" checked={formData.specialNeeds === 'No'} onChange={(e) => setFormData({...formData, specialNeeds: e.target.value})} />
                <RadioOption name="specialNeeds" value="Yes" label="Yes" checked={formData.specialNeeds === 'Yes'} onChange={(e) => setFormData({...formData, specialNeeds: e.target.value})} />
              </div>
              <AnimatePresence>
                {formData.specialNeeds === 'Yes' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                    <input 
                      type="text" 
                      value={formData.specialNeedsText}
                      onChange={(e) => setFormData({...formData, specialNeedsText: e.target.value})}
                      placeholder="Please enter details"
                      className="w-full bg-transparent border-b border-[#B78B4A]/40 py-2.5 text-[#4A2014] font-noto text-[15px] sm:text-[17px] focus:outline-none focus:border-[#5A1520] transition-colors placeholder-[#4A2014]/40 mt-2"
                    />
                    {errors.specialNeedsText && <span className="text-red-700 font-noto text-sm mt-1">{errors.specialNeedsText}</span>}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
              <label className="text-[#5A1520] font-amita text-[18px] sm:text-[20px]">Message / Blessings (Optional)</label>
              <input 
                type="text" 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                placeholder="Your message..."
                className="w-full bg-transparent border-b border-[#B78B4A]/40 py-2.5 text-[#4A2014] font-noto text-[15px] sm:text-[17px] focus:outline-none focus:border-[#5A1520] transition-colors placeholder-[#4A2014]/40"
              />
            </div>

            <div className="w-full flex justify-center mt-6">
              <button 
                type="submit"
                className="relative group flex items-center justify-center px-10 py-3.5 bg-gradient-to-br from-[#F4E6C8] to-[#E8D1A7] border border-[#B78B4A]/60 rounded-sm shadow-[0_4px_14px_rgba(90,21,32,0.12)] transition-all duration-300 hover:shadow-[0_6px_20px_rgba(90,21,32,0.18)] hover:-translate-y-0.5 overflow-hidden w-[90%] sm:w-auto"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFF8EB]/60 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                <span className="relative z-10 text-[#5A1520] font-noto text-[15px] sm:text-[17px] font-medium tracking-wide drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]">
                  Confirm Attendance
                </span>
              </button>
            </div>
          </motion.form>

        </motion.div>
      </div>
    </section>
  );
};
`

content = content.replace(oldComponent, newComponent);
fs.writeFileSync('src/App.tsx', content);
