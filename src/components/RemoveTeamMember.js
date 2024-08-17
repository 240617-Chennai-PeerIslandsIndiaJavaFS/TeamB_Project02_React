import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/RemoveTeamMember.css";

const RemoveTeamMember = () => {
  const [teamId, setTeamId] = useState("");
  const [userId, setUserId] = useState("");
  const [teamIds, setTeamIds] = useState([]);
  const [usersInTeam, setUsersInTeam] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/teams")
      .then((response) => {
        const teamIds = response.data.map((team) => team.teamId);
        setTeamIds(teamIds);
      })
      .catch((error) => {
        console.error("Error fetching team IDs:", error);
        setTeamIds([]);
      });
  }, []);

  useEffect(() => {
    if (teamId) {
      axios
        .get(`http://localhost:8080/api/teamMember?teamId=${teamId}`)
        .then((response) => {
          const usersInTeam = response.data.map((member) => ({
            userId: member.user.userId,
            userName: member.user.userName,
          }));
          setUsersInTeam(usersInTeam);
        })
        .catch((error) => {
          console.error("Error fetching team members:", error);
          setUsersInTeam([]);
        });
    } else {
      setUsersInTeam([]);
    }
  }, [teamId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .delete(
        `http://localhost:8080/api/teamMember?userId=${userId}&teamId=${teamId}`
      )
      .then((response) => {
        console.log("Team member removed successfully:", response.data);

        return axios.patch(`http://localhost:8080/api/users/${userId}`, {
          managerId: 0,
        });
      })
      .then((response) => {
        console.log("User manager_id updated successfully:", response.data);
        setTeamId("");
        setUserId("");
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "Error removing team member or updating manager_id:",
          error.response ? error.response.data : error.message
        );
        setLoading(false);
      });
  };

  return (
    <div className="remove-team-member-container">
      <form className="remove-team-member-panel" onSubmit={handleSubmit}>
        <div className="remove-team-member-header">Remove Team Member</div>

        <div className="remove-team-member-row">
          <div className="remove-team-member-section">
            <label className="remove-team-member-title" htmlFor="teamId">
              Team ID
            </label>
            <select
              className="remove-team-member-content"
              id="teamId"
              value={teamId}
              onChange={(e) => setTeamId(e.target.value)}
            >
              <option value="">Select a team</option>
              {teamIds.map((id) => (
                <option key={id} value={id}>
                  {id}
                </option>
              ))}
            </select>
          </div>

          <div className="remove-team-member-section">
            <label className="remove-team-member-title" htmlFor="userId">
              User ID
            </label>
            <select
              className="remove-team-member-content"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              disabled={!teamId}
            >
              <option value="">Select a user</option>
              {usersInTeam.map((user) => (
                <option key={user.userId} value={user.userId}>
                  {user.userName} ({user.userId})
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          className="remove-team-member-alert"
          type="submit"
          disabled={loading || !userId}
        >
          {loading ? "Removing..." : "Remove Team Member"}
        </button>
      </form>
    </div>
  );
};

export default RemoveTeamMember;
