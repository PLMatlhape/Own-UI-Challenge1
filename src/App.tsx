import "./App.css";
import { LinkCard } from "./components/LinkCard";
import { LinkRow } from "./components/LinkRow";
import { SearchControls } from "./components/SearchControls";
import { LinkForm } from "./components/LinkForm";
import { Stats } from "./components/Stats";
import { EmptyState } from "./components/EmptyState";
import { useLinkVault } from "./hooks/useLinkVault";
import { Link } from "./components/Types";

function App() {
  const {
    links,
    filteredLinks,
    searchTerm,
    selectedCategory,
    selectedTag,
    viewMode,
    showAddForm,
    editingLink,
    copiedId,
    newLink,
    categories,
    allTags,
    addLink,
    updateLink,
    deleteLink,
    editLink,
    toggleFavorite,
    copyToClipboard,
    resetForm,
    handleFormChange,
    setSearchTerm,
    setSelectedCategory,
    setSelectedTag,
    setViewMode,
    setShowAddForm,
  } = useLinkVault();

  
  console.log('App render - links:', links);
  console.log('App render - filteredLinks:', filteredLinks);

  const handleAddLink = (): void => {
    addLink();
  };

  const handleUpdateLink = (): void => {
    updateLink();
  };

  const handleEditLink = (link: Link): void => {
    editLink(link);
  };

  const handleDeleteLink = (id: number): void => {
    deleteLink(id);
  };

  const hasFilters: boolean =
    searchTerm !== "" || selectedCategory !== "all" || selectedTag !== "";

  return (
    <div className="app-container">
      <div className="app-content">
        <div className="app-header">
          <h1 className="app-title">Link Vault</h1>
          <p className="app-subtitle">Your personal link management system</p>
        </div>

        <SearchControls
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          selectedTag={selectedTag}
          viewMode={viewMode}
          categories={categories}
          allTags={allTags}
          onSearchChange={setSearchTerm}
          onCategoryChange={setSelectedCategory}
          onTagChange={setSelectedTag}
          onViewModeChange={setViewMode}
          onAddLink={() => setShowAddForm(true)}
        />

        {showAddForm && (
          <LinkForm
            newLink={newLink}
            editingLink={editingLink}
            onFormChange={handleFormChange}
            onSubmit={editingLink ? handleUpdateLink : handleAddLink}
            onCancel={resetForm}
          />
        )}

        <Stats links={links} allTags={allTags} categories={categories} />

        <div className="links-header">
          <h2 className="links-count">
            {filteredLinks.length}{" "}
            {filteredLinks.length === 1 ? "Link" : "Links"}
            {selectedCategory !== "all" && ` in ${selectedCategory}`}
            {selectedTag && ` tagged with #${selectedTag}`}
          </h2>
        </div>

        {filteredLinks.length === 0 ? (
          <EmptyState
            hasFilters={hasFilters}
            onAddLink={() => setShowAddForm(true)}
          />
        ) : (
          <div className={viewMode === "grid" ? "links-grid" : "links-list"}>
            {filteredLinks.map((link) =>
              viewMode === "grid" ? (
                <LinkCard
                  key={link.id}
                  link={link}
                  copiedId={copiedId}
                  onToggleFavorite={toggleFavorite}
                  onCopyToClipboard={copyToClipboard}
                  onEdit={handleEditLink}
                  onDelete={handleDeleteLink}
                />
              ) : (
                <LinkRow
                  key={link.id}
                  link={link}
                  copiedId={copiedId}
                  onToggleFavorite={toggleFavorite}
                  onCopyToClipboard={copyToClipboard}
                  onEdit={handleEditLink}
                  onDelete={handleDeleteLink}
                />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;