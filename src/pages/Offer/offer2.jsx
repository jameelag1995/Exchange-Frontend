<div className="Offer Page">
    <ArrowBackIcon
        sx={{
            position: "absolute",
            zIndex: "10",
            left: "16px",
            top: "16px",
            cursor: "pointer",
        }}
        onClick={() => navigate(-1)}
    />
    <div className="users-container">
        <div className="info">
            <Typography variant="h4">
                {offerInfo?.sender.displayName},
            </Typography>
            <Typography variant="h4">
                Status: {offerInfo?.status[0]?.status}
            </Typography>
        </div>

        <div className="info">
            <Typography variant="h4">
                {offerInfo?.receiver.displayName},
            </Typography>
            <Typography variant="h4">
                Status: {offerInfo?.status[1]?.status}
            </Typography>
        </div>
    </div>

    <Slide
        direction="left"
        in
        style={{ transitionDelay: 1000, transitionDuration: 1000 }}
        mountOnEnter
    >
        <div className="offer-container">
            <div className="sender-container">
                {senderOffer &&
                    senderOffer.map((product) => (
                        <div
                            key={product._id}
                            onClick={() => handleSenderOfferClick(product)}
                        >
                            <ProductOfferCard productInfo={product} />
                        </div>
                    ))}
            </div>
            <div className="buttons-container">
                <Typography variant="h4">
                    {"< "}Your Offer {" >"}
                </Typography>
                <Button
                    variant="contained"
                    color="warning"
                    onClick={() => handleOfferUpdate("Pending")}
                    disabled={offerEnded}
                >
                    Update Offer
                </Button>
                <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleOfferUpdate("Accepted")}
                    disabled={offerEnded}
                >
                    Accept Offer
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleOfferUpdate("Rejected")}
                    disabled={offerEnded}
                >
                    Reject Offer
                </Button>
                {offerEnded && (
                    <Typography variant="h4">Trade Ended</Typography>
                )}
            </div>
            <div className="receiver-container">
                {receiverOffer &&
                    receiverOffer.map((product) => (
                        <div
                            key={product._id}
                            onClick={() => handleReceiverOfferClick(product)}
                        >
                            <ProductOfferCard productInfo={product} />
                        </div>
                    ))}
            </div>
        </div>
    </Slide>

    <Slide
        direction="right"
        in
        style={{ transitionDelay: 1000, transitionDuration: 1000 }}
        mountOnEnter
    >
        <div className="products-to-offer-container">
            <div className="sender-container">
                {senderProducts &&
                    senderProducts?.map((product) => (
                        <div
                            key={product._id}
                            onClick={() => handleSenderProductsClick(product)}
                        >
                            <ProductOfferCard productInfo={product} />
                        </div>
                    ))}
            </div>
            <div className="offer-sides-info">
                {/* <Typography variant="h4">
                    {offerInfo?.sender.displayName}
                </Typography> */}
                <Typography variant="h4">
                    {"< "}Your Products{" >"}
                </Typography>
                {/* <Typography variant="h4">
                    {offerInfo?.receiver.displayName}
                </Typography> */}
            </div>
            <div className="receiver-container">
                {receiverProducts &&
                    receiverProducts?.map((product) => (
                        <div
                            key={product._id}
                            onClick={() => handleReceiverProductsClick(product)}
                        >
                            <ProductOfferCard productInfo={product} />
                        </div>
                    ))}
            </div>
        </div>
    </Slide>
    <Slide
        direction="up"
        in
        style={{ transitionDelay: 1000, transitionDuration: 1000 }}
        mountOnEnter
    >
        <div className="text-container">
            <div className="messages-container">
                <ul>
                    {offerInfo?.conversation?.map((msg, index) => (
                        <li key={index}>{`${msg.sender}: ${msg.content}`} </li>
                    ))}
                </ul>
            </div>
            <TextField
                multiline
                minRows={1}
                placeholder="Enter Your Message Here..."
                label="Text Message"
                sx={{ width: "300px" }}
                inputRef={messageRef}
            />
        </div>
    </Slide>

    {msg && <BasicModal msg={msg} setMsg={setMsg} />}
</div>;
