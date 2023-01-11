import axios from 'axios';

export async function getListOfJobs(jobTitle: string, numJobs: number = 20) {
  const res = await axios.post<API.ListJobsResponse>('https://www.zippia.com/api/jobs/', {
    'companySkills': true,
    'dismissedListingHashes': [],
    'fetchJobDesc': true,
    'jobTitle': jobTitle,
    'locations': [],
    'numJobs': numJobs,
    'previousListingHashes': []
  });
  return res.data;
}
