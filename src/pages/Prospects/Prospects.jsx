import React, { useState } from "react";
import DashboardWrapper from "../../components/DashboardWrapper/DashboardWrapper";
import HomeCard from "../../components/HomeCard/HomeCard";
import AddProspectModal from "../../components/Modals/AddProspectModal";

const Prospects = () => {
  const [addProspectModalOpen, setAddProspectModalOpen] = useState(false);

  return (
    <DashboardWrapper title="Prospects">
      <div className="my-6 bg-white rounded-xl p-4 max-w-6xl">
        <h2 className="text-md font-bold mb-2 ml-3 fo text-dark-color">
          Prospects
        </h2>
        <hr className="border-0 h-[2px] my-2 opacity-50 border-dark-color bg-dark-color" />

        <div className="flex justify-end my-4">
          <button onClick={()=>setAddProspectModalOpen(true)} className="px-8 py-2 bg-primary-blue rounded-lg text-white uppercase">Add prospect</button>
        </div>

        <div className="px-12 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-16">
          <HomeCard />
          <HomeCard />
          <HomeCard />
          <HomeCard />
        </div>
      </div>
      <AddProspectModal
        title={"New Propspect"}
        size="sm"
        isOpen={addProspectModalOpen}
        closeModal={() => setAddProspectModalOpen(false)}
      />
    </DashboardWrapper>
  );
};

export default Prospects;
