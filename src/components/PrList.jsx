import { React, useState, useEffect } from 'react';
import { useNavigationContext } from './NavigationContext';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';

function PrList() {
  const { activeCollection } = useNavigationContext();
  console.log('context consumption worked!', activeCollection)

  const [pullRequests, setPullRequests] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const filterUserLogins = ['xx'];
  const accessToken = 'xx';

  useEffect(() => {
    if (activeCollection) {
      const fetchFilteredPullRequests = async () => {
        try {
          const response = await fetch(`https://api.github.com/repos/ansible-collections/${activeCollection}/pulls?state=open`, {
            headers: {
              Authorization: `token ${accessToken}`
            }
          });
          const data = await response.json();
          const filteredPRs = filterPullRequestsByUser(data);
          const pullRequestsWithReviews = await fetchReviews(filteredPRs);
          setPullRequests(pullRequestsWithReviews);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchFilteredPullRequests();
    }
  }, [activeCollection]);

  const filterPullRequestsByUser = (pullRequestsData) => {
    return pullRequestsData.filter(pr => filterUserLogins.includes(pr.user.login));
  };

  const fetchReviews = async (pullRequestsData) => {
    const reviewsData = await Promise.all(pullRequestsData.map(async pr => {
      const response = await fetch(`https://api.github.com/repos/ansible-collections/${activeCollection}/pulls/${pr.number}/reviews`, {
        headers: {
          Authorization: `token ${accessToken}`
        }
      });
      return response.json();
    }));
    return pullRequestsData.map((pr, index) => ({
      ...pr,
      reviewsData: reviewsData[index],
      reviewers: [...new Set(reviewsData[index].filter(review => review.state === 'COMMENTED').map(review => review.user.login))],
      approvers: reviewsData[index].filter(review => review.state === 'APPROVED').map(review => review.user.login)
    }));
  };

  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>PR Number</TableCell>
              <TableCell>PR Name</TableCell>
              <TableCell>PR Author</TableCell>
              <TableCell>Date Opened</TableCell>
              <TableCell>Last Activity At</TableCell>
              <TableCell>Approvals</TableCell>
              <TableCell>Approved By</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pullRequests.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(pr => (
              <TableRow key={pr.id}>
                <TableCell>{pr.number}</TableCell>
                <TableCell>
                  <a href={pr.html_url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <span style={{ cursor: 'pointer', textDecoration: 'underline', color: 'blue', transition: 'color 0.3s' }}>
                      {pr.title}
                    </span>
                  </a>
                </TableCell>
                <TableCell>{pr.user.login}</TableCell>
                <TableCell>{formatDate(pr.created_at)}</TableCell>
                <TableCell>{formatDate(pr.updated_at)}</TableCell>
                <TableCell>{pr.approvers.length}</TableCell>
                <TableCell>{pr.approvers.join(',')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={pullRequests.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </div>
  );
}

export default PrList;
