// --- Creation Pane Component ---
const CreationPane = ({ chatId, parentBlockId, reload, onCreated }: CreationPaneProps) => {
  const chatData = useChatStore((state) => state.chatData);
  const [isCreating, setIsCreating] = useState(false);
  const [message, setMessage] = useState("");

  const parentBlock = chatData?.blocks[parentBlockId];

  const handleCreate = async () => {
    if (!message.trim() || !chatData) return;
    setIsCreating(true);
    const branchId = crypto.randomUUID();

    try {
      const parentBlock = chatData.blocks[parentBlockId];
      if (!parentBlock) throw new Error("Block not found");

      const parentBranch = chatData.branches[parentBlock.branch_id];
      const branchDepth = (parentBranch?.depth ?? 0) + 1;

      const response = await fetch("/api/internal/branch/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          branch_id: branchId,
          chat_id: chatId,
          parent_branch_id: parentBlock.branch_id,
          parent_block_id: parentBlock.block_id,
          depth: branchDepth,
          title: message.substring(0, 50)
        })
      });

      if (!response.ok) throw new Error("Failed to initialize branch");

      toast.success("ブランチを作成しました");
      await reload();
      onCreated(branchId, message);
    } catch (error) {
      console.error(error);
      toast.error("作成に失敗しました");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-background relative overflow-hidden">
      {/* メッセージエリア: スクロールバーを隠し、分岐を強調 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {parentBlock && (
          <div className="max-w-3xl mx-auto opacity-80 origin-top pt-4">
            <MessageBlock
              block={parentBlock}
              connector={{
                style: "branched", // 分岐スタイルを採用
                type: "continue"
              }}
            />
          </div>
        )}
      </div>
      
      {/* 入力エリア: フィールドが浮いているようなモダンなグラデーションデザイン */}
      <div className="pointer-events-none z-20 bg-background pb-[env(safe-area-inset-bottom)] relative mt-auto">
        <div className="absolute -top-7 left-0 right-0 z-0 h-8 bg-gradient-to-b from-transparent to-background" />
        <div className="relative z-10 mx-auto w-full max-w-4xl px-6 pt-0 pb-6">
          <div className="pointer-events-auto mx-auto w-full max-w-3xl">
            <ChatComposer
              value={message}
              onChange={setMessage}
              onSubmit={handleCreate}
              isSending={isCreating}
              placeholder="新しいブランチでメッセージを送信..."
              alwaysBorder={false} // モダンな枠なしスタイル
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Container (統合版) ---
export function ChatUIContainer({ chatId, mainBranchId, initialActiveBranchId, initialCreationContext, reload, onCloseAll, onBranch, chatData, isLoading }: ChatUIContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const firstChatRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  // モバイルでのスクロール位置調整
  useEffect(() => {
    if (firstChatRef.current && chatData && !isReady) {
      firstChatRef.current.scrollIntoView({ behavior: 'auto', inline: 'center' });
      setIsReady(true);
    }
  }, [chatData, isReady]);

  // isMobile フック (developのロジック)
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const onChange = () => setIsMobile(mql.matches);
    setIsMobile(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // ... (activePanes, addPane, removePane 等のロジックは既存のものを維持) ...

  return (
    <div className="flex flex-1 h-full w-full overflow-hidden bg-transparent">
      {isMobile ? (
        /* 1. Mobile Layout: BranchTreeスライド + チャットスライド */
        <div
          ref={containerRef}
          className={cn(
            "flex w-full h-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory gap-2 p-2 scroll-smooth",
            !isReady ? "opacity-0 invisible" : "opacity-100 visible"
          )}
        >
          {/* 先頭にツリー表示を表示 */}
          <div className="min-w-full max-w-full snap-center h-full flex-shrink-0">
            <BranchTree chatId={chatId} chatData={chatData} isLoading={isLoading} />
          </div>

          {activePanes.map((pane, index) => (
            <div
              key={pane.id}
              ref={index === 0 ? firstChatRef : null}
              className="min-w-full max-w-full snap-center h-full flex-shrink-0"
            >
              <ChatPaneHelper
                pane={pane}
                onRemove={removePane}
                chatId={chatId}
                reload={reload}
                onPaneConfigUpdate={updatePaneConfig}
                onBranch={handleBranch}
                mainBranchId={mainBranchId}
                onCreated={(newBranchId, message) => handleCreated(pane.id, newBranchId, message)}
              />
            </div>
          ))}
          {/* ... AddButton 等 ... */}
        </div>
      ) : (
        /* 2. Desktop Layout: Resizableパネル */
        <>
          <ResizablePanelGroup orientation="horizontal" className="flex flex-1">
            {activePanes.map((pane, index) => (
              <Fragment key={pane.id}>
                <ResizablePanel defaultSize={100 / activePanes.length} minSize={25}>
                  <ChatPaneHelper
                    pane={pane}
                    onRemove={removePane}
                    chatId={chatId}
                    reload={reload}
                    onPaneConfigUpdate={updatePaneConfig}
                    onBranch={handleBranch}
                    mainBranchId={mainBranchId}
                    onCreated={(newBranchId, message) => handleCreated(pane.id, newBranchId, message)}
                  />
                </ResizablePanel>
                {index < activePanes.length - 1 && <ResizableHandle className="bg-transparent w-2" />}
              </Fragment>
            ))}
          </ResizablePanelGroup>
          {/* ... DesktopAddButtonArea ... */}
        </>
      )}
    </div>
  );
}