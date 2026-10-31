import React, { useState } from 'react';
import {
  X,
  Upload,
  CheckCircle2,
  FileText,
  Image,
  AlertCircle,
  MessageCircle,
} from 'lucide-react';
import { Gender, MaritalStatus, CustomerInquiry } from '../types/index.ts';
import { StorageService } from '../services/storage.ts';

interface RegisterBiodataModalProps {
  isOpen: boolean;
  onClose: () => void;
  whatsappNumber: string;
  onInquirySubmitted?: () => void;
}

export const RegisterBiodataModal: React.FC<RegisterBiodataModalProps> = ({
  isOpen,
  onClose,
  whatsappNumber,
  onInquirySubmitted,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [gender, setGender] = useState<Gender>('Bride');
  const [candidateName, setCandidateName] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [caste, setCaste] = useState('Rajpoot');
  const [subCaste, setSubCaste] = useState('');
  const [age, setAge] = useState<number>(25);
  const [height, setHeight] = useState("5' 4\"");
  const [maritalStatus, setMaritalStatus] = useState<MaritalStatus>('Never Married');
  const [sect, setSect] = useState('Islam - Sunni');
  const [education, setEducation] = useState('');
  const [occupation, setOccupation] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('Pakistan');
  const [familyDetails, setFamilyDetails] = useState('');
  const [partnerRequirements, setPartnerRequirements] = useState('');

  // Uploaded files
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<
    Array<{ name: string; dataUrl: string; type: string; size: string }>
  >([]);

  if (!isOpen) return null;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPhotoPreview(result);
    };
    reader.readAsDataURL(file);
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const sizeStr = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
        setUploadedFiles((prev) => [
          ...prev,
          {
            name: file.name,
            dataUrl: result,
            type: file.type.includes('pdf') ? 'pdf' : 'doc',
            size: sizeStr,
          },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeUploadedFile = (idx: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const inquiryId = `INQ-${Math.floor(1000 + Math.random() * 9000)}`;

    const messageText = `Candidate: ${candidateName} (${gender}, ${age} yrs, ${height}, ${maritalStatus}). Caste: ${caste} ${subCaste ? `(${subCaste})` : ''}. Education: ${education}. Occupation: ${occupation}. City: ${city}, ${country}. Guardian: ${guardianName || 'Self'}. Family info: ${familyDetails}. Partner preference: ${partnerRequirements}.`;

    const newInquiry: CustomerInquiry = {
      id: inquiryId,
      name: guardianName ? `${guardianName} (for ${candidateName})` : candidateName,
      phone: phone,
      email: email,
      seekingFor: gender,
      candidateAge: Number(age),
      caste: caste,
      city: city,
      message: messageText,
      status: 'New',
      uploadedFiles: [
        ...(photoPreview
          ? [
              {
                name: `${candidateName}_Photo.jpg`,
                dataUrl: photoPreview,
                type: 'image',
                size: 'Photo',
              },
            ]
          : []),
        ...uploadedFiles,
      ],
      createdAt: new Date().toISOString().split('T')[0],
      adminNotes: 'Online website submission. Pending bureau review.',
    };

    StorageService.addInquiry(newInquiry);
    setSubmitted(true);
    if (onInquirySubmitted) onInquirySubmitted();
  };

  const whatsappDirectUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Assalam o Alaikum, I just submitted our rishta biodata on your website for ${candidateName} (${gender}, ${caste}, ${city}). Please confirm receipt.`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-neutral-900 border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden my-6 text-neutral-100 flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-neutral-950 border-b border-amber-900/40 flex items-center justify-between sticky top-0 z-20">
          <div>
            <div className="font-urdu text-amber-400 text-lg font-bold">
              آن لائن بائیو ڈیٹا رجسٹریشن
            </div>
            <h2 className="font-serif-title text-lg sm:text-xl font-bold text-white">
              Register Candidate Biodata & Proposal
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif-title text-2xl font-bold text-white">
                Biodata Registered Successfully!
              </h3>
              <p className="text-neutral-300 text-sm max-w-md mx-auto leading-relaxed">
                Thank you. Your proposal details have been safely registered with Rajpoot Marriage Bureau Chakwal. Our senior matchmaker will review the biodata and contact you.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-950/40 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Notify Chakwal Office on WhatsApp</span>
                </a>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs sm:text-sm font-semibold transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-xs sm:text-sm">
              {/* Proposal Gender Select */}
              <div className="space-y-1.5">
                <label className="block text-neutral-300 font-semibold">
                  Proposal Type (رشتہ برائے) *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setGender('Bride')}
                    className={`py-3 px-4 rounded-xl border text-center font-semibold transition-all cursor-pointer ${
                      gender === 'Bride'
                        ? 'bg-rose-950/80 border-rose-500 text-rose-200 shadow-md shadow-rose-950/30'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    Bride / لڑکی (دلہن)
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender('Groom')}
                    className={`py-3 px-4 rounded-xl border text-center font-semibold transition-all cursor-pointer ${
                      gender === 'Groom'
                        ? 'bg-blue-950/80 border-blue-500 text-blue-200 shadow-md shadow-blue-950/30'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    Groom / لڑکا (دولہا)
                  </button>
                </div>
              </div>

              {/* Basic Candidate Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    Candidate Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    placeholder="e.g. Hammad Ali / Fatima Zahra"
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    Guardian / Contact Person Name
                  </label>
                  <input
                    type="text"
                    value={guardianName}
                    onChange={(e) => setGuardianName(e.target.value)}
                    placeholder="e.g. Father / Mother / Self"
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="03XX-XXXXXXX or +44..."
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    Caste / Clan (ذات / برادری) *
                  </label>
                  <input
                    type="text"
                    required
                    value={caste}
                    onChange={(e) => setCaste(e.target.value)}
                    placeholder="e.g. Rajpoot, Chaudhry, Syed, Awan, Jatt..."
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    Subcaste / Shakh
                  </label>
                  <input
                    type="text"
                    value={subCaste}
                    onChange={(e) => setSubCaste(e.target.value)}
                    placeholder="e.g. Janjua, Minhas, Bhatti, Gondal..."
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    Age (عمر) *
                  </label>
                  <input
                    type="number"
                    min={18}
                    max={75}
                    required
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    Height (قد) *
                  </label>
                  <input
                    type="text"
                    required
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="e.g. 5' 4&quot; or 5' 10&quot;"
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    Marital Status *
                  </label>
                  <select
                    value={maritalStatus}
                    onChange={(e) => setMaritalStatus(e.target.value as MaritalStatus)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
                  >
                    <option value="Never Married">Never Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Khula">Khula</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    Religion / Sect (مسلک)
                  </label>
                  <select
                    value={sect}
                    onChange={(e) => setSect(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
                  >
                    <option value="Islam - Sunni">Islam - Sunni</option>
                    <option value="Islam - Shia">Islam - Shia</option>
                    <option value="Islam - Ahl-e-Hadith">Islam - Ahl-e-Hadith</option>
                    <option value="Islam - Deobandi">Islam - Deobandi</option>
                    <option value="Islam - Barelvi">Islam - Barelvi</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    Education / Qualification *
                  </label>
                  <input
                    type="text"
                    required
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    placeholder="e.g. MBBS, BS CS, M.Sc, MBA..."
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    Occupation & Income *
                  </label>
                  <input
                    type="text"
                    required
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    placeholder="e.g. Doctor, Software Engineer, Business Owner..."
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    Current City *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Chakwal, Rawalpindi, Islamabad, London..."
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    Country *
                  </label>
                  <input
                    type="text"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Pakistan, UK, USA, UAE..."
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Family Details Textarea */}
              <div>
                <label className="block text-neutral-300 font-medium mb-1">
                  Family Background (والد کا پیشہ، بھائی، بہنیں، جائیداد وغیرہ)
                </label>
                <textarea
                  rows={2}
                  value={familyDetails}
                  onChange={(e) => setFamilyDetails(e.target.value)}
                  placeholder="Father's profession, number of brothers/sisters (married/unmarried), family residence type..."
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-3 text-neutral-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Partner Expectations */}
              <div>
                <label className="block text-neutral-300 font-medium mb-1">
                  Partner Expectations (شریک حیات سے توقعات: عمر، تعلیم، برادری)
                </label>
                <textarea
                  rows={2}
                  value={partnerRequirements}
                  onChange={(e) => setPartnerRequirements(e.target.value)}
                  placeholder="Preferred age, acceptable castes, education or profession, location preferences..."
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-3 text-neutral-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Photo & Document Upload (Requirement 3: Upload profile pictures, documents, and PDF files) */}
              <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-4">
                <div className="font-semibold text-neutral-200 flex items-center gap-2">
                  <Upload className="w-4 h-4 text-amber-400" />
                  <span>Upload Profile Picture & Documents / PDF (اختیاری تصاویر و دستاویزات)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Photo Upload */}
                  <div className="border border-dashed border-neutral-700 rounded-xl p-4 text-center hover:border-amber-500/50 transition-colors">
                    {photoPreview ? (
                      <div className="space-y-2">
                        <img
                          src={photoPreview}
                          alt="Candidate Preview"
                          className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-amber-500/50"
                        />
                        <button
                          type="button"
                          onClick={() => setPhotoPreview(null)}
                          className="text-xs text-rose-400 hover:text-rose-300 block mx-auto"
                        >
                          Remove Photo
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer block">
                        <Image className="w-8 h-8 text-neutral-500 mx-auto mb-1.5" />
                        <span className="text-xs text-amber-400 font-medium block">
                          Upload Profile Picture
                        </span>
                        <span className="text-[11px] text-neutral-500 block">
                          JPG, PNG (Kept strictly private)
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>

                  {/* Document / PDF Upload */}
                  <div className="border border-dashed border-neutral-700 rounded-xl p-4 text-center hover:border-amber-500/50 transition-colors">
                    <label className="cursor-pointer block">
                      <FileText className="w-8 h-8 text-neutral-500 mx-auto mb-1.5" />
                      <span className="text-xs text-amber-400 font-medium block">
                        Upload Biodata Document / PDF
                      </span>
                      <span className="text-[11px] text-neutral-500 block">
                        PDF, DOCX (Optional)
                      </span>
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx"
                        onChange={handleDocumentUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Uploaded Documents List */}
                {uploadedFiles.length > 0 && (
                  <div className="space-y-1.5 pt-2 border-t border-neutral-800">
                    <span className="text-[11px] text-neutral-400">Attached files:</span>
                    {uploadedFiles.map((f, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2 rounded bg-neutral-900 text-xs"
                      >
                        <span className="text-neutral-200 truncate">{f.name}</span>
                        <button
                          type="button"
                          onClick={() => removeUploadedFile(idx)}
                          className="text-neutral-400 hover:text-rose-400 ml-2"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Privacy Notice */}
              <div className="text-[11px] text-neutral-400 flex items-start gap-2 bg-neutral-950/40 p-3 rounded-lg border border-neutral-800">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Your candidate information is treated with highest confidentiality. Rajpoot Marriage Bureau Chakwal verifies all submissions before any biodata exchange.
                </span>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-neutral-700 hover:bg-neutral-800 text-neutral-300 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                >
                  Submit Biodata (اندراج کروائیں)
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
