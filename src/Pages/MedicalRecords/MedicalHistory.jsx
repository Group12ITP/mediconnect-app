import { prescriptionsData } from '../../data/prescriptionsData';
import { Calendar, Stethoscope, ClipboardList, Pill, AlertCircle } from 'lucide-react';

const MedicalHistory = () => {
  const getSpecialtyIcon = (specialty) => {
    if (specialty.includes('Cardio')) return '❤️';
    if (specialty.includes('Neuro')) return '🧠';
    if (specialty.includes('Derma')) return '🩺';
    if (specialty.includes('Ped')) return '👶';
    return '⚕️';
  };

  const getStatusColor = (date) => {
    const recordDate = new Date(date);
    const now = new Date();
    const diffDays = Math.floor((now - recordDate) / (1000 * 60 * 60 * 24));
    if (diffDays <= 30) return 'bg-green-100 text-green-700';
    if (diffDays <= 90) return 'bg-yellow-100 text-yellow-700';
    return 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="h-full bg-gradient-to-br from-gray-50 via-white to-gray-50 rounded-3xl shadow-xl p-8 overflow-auto">
      {/* Header Section */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg">
              <ClipboardList className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Medical History
            </h1>
          </div>
          <div className="px-4 py-2 bg-emerald-50 rounded-full text-sm font-medium text-emerald-700">
            {prescriptionsData.length} Records
          </div>
        </div>
        <p className="text-gray-500 ml-14 mt-1">Your complete medical consultation timeline</p>
      </div>

      {/* Timeline Container */}
      <div className="relative">
        {/* Vertical Timeline Line */}
        <div className="absolute left-[43px] top-8 bottom-8 w-0.5 bg-gradient-to-b from-emerald-300 via-teal-200 to-emerald-100"></div>

        <div className="space-y-8">
          {prescriptionsData.map((item) => (
            <div key={item.id} className="relative group">
              {/* Timeline Dot */}
              <div className="absolute left-[35px] -translate-x-1/2 w-4 h-4 rounded-full bg-white border-4 border-emerald-500 z-10 group-hover:scale-125 transition-transform duration-300"></div>

              {/* Card */}
              <div className="ml-20 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group-hover:border-emerald-200">
                {/* Card Header */}
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-4 border-b border-emerald-100">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm">
                        {getSpecialtyIcon(item.specialty)}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">{item.doctor}</h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Stethoscope className="w-3.5 h-3.5 text-emerald-600" />
                          <p className="text-sm text-emerald-700 font-medium">{item.specialty}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.date)}`}>
                        {new Date(item.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-500 text-sm bg-white px-3 py-1 rounded-full shadow-sm">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{new Date(item.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  {/* Medications Section */}
                  <div className="mb-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Pill className="w-4 h-4 text-emerald-600" />
                      <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Prescribed Medications</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {item.medicines.map((med, i) => (
                        <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all duration-200">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-semibold text-gray-800">{med.name}</p>
                              <p className="text-sm text-gray-500 mt-1">{med.dosage}</p>
                            </div>
                            <div className="w-6 h-6 bg-emerald-100 rounded-lg flex items-center justify-center">
                              <span className="text-xs text-emerald-700 font-bold">{i + 1}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Notes Section */}
                  {item.notes && (
                    <div className="mt-4 p-4 bg-amber-50 rounded-xl border-l-4 border-amber-400">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-1">Clinical Notes</p>
                          <p className="text-sm text-gray-700 leading-relaxed">{item.notes}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Footer Actions */}
                  <div className="mt-5 pt-4 border-t border-gray-100 flex justify-end gap-3">
                    <button className="text-xs text-emerald-600 hover:text-emerald-700 font-medium px-3 py-1.5 rounded-lg hover:bg-emerald-50 transition-colors">
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MedicalHistory;