import React, { useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import useCollapse from "react-collapsed";
import styled from "styled-components";
import Iconup from "./IconUp";
import rehypeReact from "rehype-react";

//Single source of truth

const Title = styled.h1`
  font-size: 1.3em;
  text-align: center;
  color: black;
`;

const Doc = styled.div`
  diplay: block;
  flex-flow: column;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const DocHeader = styled.h1`
  flex: 0 1 auto;
  width: 100;
`;

// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.section`
  background: papayawhip;
  height: 50px;
  border: 1px solid black;
  display: flex;
  justify-content: space-between;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-top: 1rem;
`;

const CommentWrapper = styled.section`
  background: white;
  height: auto;
  border: 1px solid red;
  display: block;
  justify-content: space-between;
  padding-left: 1rem;
  padding-right: 1rem;
`;

const ParamsRender = ({ params }) => {
  if (params) {
    return (
      <div>
        <h4>Parameters</h4>

        <dl>
          {params.map((item) => {
            return (
              <>
                <dt>{item.name}</dt>
                {item.type ? (
                  <dd>
                    <b>type:</b> ({item.type ? item.type.name : null})
                  </dd>
                ) : null}
              
                  <dd
                    dangerouslySetInnerHTML={{
                      __html: item.description
                        ? item.description.childMarkdownRemark.html
                        : null,
                    }}
                  />
              </>
            );
          })}
        </dl>
      </div>
    );
  }
  return null;
};

const SSOTrender = () => {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

  const data = useStaticQuery(graphql`
    query hello {
      allFile(filter: { sourceInstanceName: { eq: "repo-one" } }) {
        edges {
          node {
            extension
            dir
            modifiedTime
            relativePath
            gitRemote {
              webLink
            }
            childrenDocumentationJs {
              id
              name
              description {
                children {
                  id
                }
                childMarkdownRemark {
                  html
                  htmlAst
                }
                childrenMdx {
                  id
                  headings {
                    value
                    depth
                  }
                }
              }
              returns {
                id
                copyright
                name
                params {
                  id
                }
              }
              params {
                name
                type {
                  name
                }
                description {
                  childMarkdownRemark {
                    html
                    htmlAst
                  }
                }
              }
            }
          }
        }
      }
    }
  `);
  //Retrieve all edges from all Files
  const { edges } = data.allFile;
  console.log(edges);
  return edges.map((edge) => {
    return (
      <>
        <Wrapper>
          <Title>
            <a
              target="_blank"
              href={`${edge.node.gitRemote.webLink}/blob/main/${edge.node.relativePath}`}
            >
              {edge.node.relativePath}
            </a>
          </Title>
          <Iconup {...getToggleProps()} rotation={isExpanded ? -180 : 0} />
        </Wrapper>

        <div {...getCollapseProps()}>
          <CommentWrapper>
            {edge.node.childrenDocumentationJs.map((doc) => {
              const { params } = doc;
              return (
                <Doc>
                  <hr /> <h4>{doc.name}()</h4>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: doc.description
                        ? doc.description.childMarkdownRemark.html
                        : null,
                    }}
                  />
                  <ParamsRender {...doc} />
                </Doc>
              );
            })}
          </CommentWrapper>
        </div>
      </>
    );
  });
};

export default SSOTrender;
