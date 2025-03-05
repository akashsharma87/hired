import { getApplications } from '@/api/apiApplications';
import useFetch from '@/hooks/use-fetch';
import React, { useEffect, useRef } from 'react';
import { BarLoader } from 'react-spinners';
import ApplicationCard from './application-card';
import { useUser } from '@clerk/clerk-react';

function CreatedApplications() {
  const { user } = useUser();
  const fetchTriggered = useRef(false);

  const {
    loading: loadingApplications,
    data: applications,
    fn: fnApplications,
    error
  } = useFetch(getApplications, {
    user_id: user?.id,
  });

  useEffect(() => {
    if (user?.id && !fetchTriggered.current) {
      fnApplications();
      fetchTriggered.current = true;
    }
  }, [user?.id, fnApplications]);

  if (loadingApplications) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  if (error) {
    return (
      <div>
        <p>Error loading applications: {error.message}</p>
      </div>
    );
  }

  if (!applications || applications.length === 0) {
    return <p>No applications found</p>;
  }

  return (
    <div className='flex flex-col gap-2'>
      {applications.map((application) => (
        <ApplicationCard 
          key={application.id} 
          application={application} 
          isCandidate={true}
        />
      ))}
    </div>
  );
}

export default CreatedApplications;
