import styled from "styled-components";

export const BlockTile = styled("div").withConfig({
  shouldForwardProp: (prop) => !["isEven", "customBackground"].includes(prop),
})<{ customBackground: string; isEven: boolean }>`
  @keyframes popout {
    from {
      transform: scale(0.8);
    }

    to {
      transform: scale(1);
    }
  }

  @-webkit-keyframes popout {
    from {
      -webkit-transform: scale(0.8);
    }

    to {
      -webkit-transform: scale(1);
    }
  }

  height: 100px;
  width: 100px;
  background: lightgray;

  display: flex;
  gap: 5px;
  justify-content: center;
  align-items: center;
  font-size: 45px;
  font-weight: 800;
  color: white;

  background: ${(props) => props.customBackground};
  color: ${(props) =>
    props.isEven ? "var(--darker-brown)" : "var(--light-grey)"};

  animation: popout 0.3s ease;
  -webkit-animation: popout 0.3s ease;
`;
